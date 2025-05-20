import { open, FileHandle, writeFile, unlink, readFile } from "fs/promises";

export class LockManager {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  public async lockFile(filepath: string, isWrite: boolean): Promise<boolean> {
    // return a promise
    return new Promise((resolve, reject) => {
      // add the lock task to the lock manager's queue
      this.queue.push(async () => {
        try {
          let result: boolean;
          if (isWrite) {
            result = await this.writeTryLock(filepath);
          } else {
            result = await this.readTryLock(filepath);
          }
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      // tell the lock manager to run its queued tasks
      this.processQueue();
    });
  }

  public async unlockFile(filepath: string): Promise<void> {
    // return a promise
    return new Promise((resolve, reject) => {
      // add the lock task to the lock manager's queue
      this.queue.push(async () => {
        try {
          await this.unLock(filepath);
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      // tell the lock manager to run its queued tasks
      this.processQueue();
    });
  }

  private async processQueue() {
    // if lock manager is already running, we don't need to run twice
    if (this.isProcessing) return;
    this.isProcessing = true;

    // while there are tasks to complete
    while (this.queue.length > 0) {
      // task is first popped off of queue
      const task = this.queue.shift();
      if (task) {
        // complete task
        await task();
      }
    }

    // indicate that we are no longer processing tasks
    this.isProcessing = false;
  }

  private async readTryLock(filepath: string): Promise<boolean> {
    const lockFilePath = `${filepath}.lock`;
    // start time of operation
    const startTime = Date.now();

    try {
      // make lock file
      const lockFile = await open(lockFilePath, "r+").catch(async (err) => {
        if (err.code === "ENOENT") {
          // If the file doesn't exist, create it
          return await open(lockFilePath, "w+");
        }
        throw err;
      });

      // try to read file
      const lockFileContents: Buffer = await lockFile.readFile();
      if (lockFileContents.toString().includes("w")) {
        // close lockFile for now
        await lockFile.close();

        // return false to indicate lock exists
        return false;
      }

      // add reader
      await lockFile.appendFile("r");

      // close file handler
      await lockFile.close();

      // lock successful
      console.log(`Locking file ${filepath}`);
      return true;
    } catch (err: any) {
      // file already exists (already locked)
      console.error(err);
      throw err;
    }
  }

  private async writeTryLock(filepath: string): Promise<boolean> {
    const lockFilePath = `${filepath}.lock`;

    try {
      // make lock file
      const lockFile: FileHandle = await open(lockFilePath, "wx");

      // indicate write lock
      await writeFile(lockFile, "w");

      // close file handler
      await lockFile.close();

      // lock successful
      console.log(`Locking file ${filepath}`);
      return true;
    } catch (err: any) {
      // file already exists (already locked)
      if (err.code === "EEXIST") {
        return false;
      } else {
        console.error(err);
        throw err;
      }
    }
  }

  private async unLock(filepath: string): Promise<void> {
    const lockFilePath = `${filepath}.lock`;
    try {
      // open lock file read/write
      const lockFile = await open(lockFilePath, "r+");

      // read contents of lock file as string
      const lockFileContentsBuffer: Buffer = await lockFile.readFile();
      const lockFileContents = lockFileContentsBuffer.toString();

      // if file open for reading
      if (lockFileContents.includes("r")) {
        // get new file string by deleting a reader
        const updatedContents = lockFileContents.replace("r", "");

        // if no more readers
        if (updatedContents.length === 0) {
          // delete lock file
          await lockFile.close();
          await unlink(lockFilePath);
        } else {
          // just remove a reader
          await lockFile.truncate(0);
          await lockFile.writeFile(updatedContents);
          await lockFile.close();
        }
      } else {
        // if file is just for writing, delete it
        await lockFile.close();
        await unlink(lockFilePath);
      }
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.error(`Lock file ${lockFilePath} does not exist.`);
      } else {
        console.error(`Error unlocking file ${lockFilePath}:`, err);
        throw err;
      }
    }
  }
}
