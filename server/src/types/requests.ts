export interface TerminalReqBody {
  cwd: string;
}

export function isTerminalReqBody(obj: unknown): obj is TerminalReqBody {
  return (
    "cwd" in (obj as Object) && typeof (obj as TerminalReqBody).cwd === "string"
  );
}

export interface LsReqBody extends TerminalReqBody {
  path: string;
}

export function isLsReqBody(obj: unknown): obj is LsReqBody {
  return (
    isTerminalReqBody(obj) &&
    "path" in obj &&
    typeof (obj as LsReqBody).path == "string"
  );
}

export interface CdReqBody extends TerminalReqBody {
  path: string;
}

export function isCdReqBody(obj: unknown): obj is CdReqBody {
  return (
    isTerminalReqBody(obj) &&
    "path" in obj &&
    typeof (obj as CdReqBody).path === "string"
  );
}

export interface ReadReqBody extends TerminalReqBody {
  file: string;
  numBytes?: number;
  offset?: number;
}

// Type guard for ReadReqBody
export function isReadReqBody(obj: unknown): obj is ReadReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as ReadReqBody).file === "string"
  );
}

export interface RmReqBody extends TerminalReqBody {
  file: string;
}

// Type guard for RmReqBody
export function isRmReqBody(obj: unknown): obj is RmReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as RmReqBody).file === "string"
  );
}

export interface RmdirReqBody extends TerminalReqBody {
  name: string;
}

// Type guard for RmReqBody
export function isRmdirReqBody(obj: unknown): obj is RmdirReqBody {
  return (
    isTerminalReqBody(obj) &&
    "name" in obj &&
    typeof (obj as RmdirReqBody).name === "string"
  );
}

export interface MkdirReqBody extends TerminalReqBody {
  name: string;
}

// Type guard for MkdirReqBody
export function isMkdirReqBody(obj: unknown): obj is MkdirReqBody {
  return (
    isTerminalReqBody(obj) &&
    "name" in obj &&
    typeof (obj as MkdirReqBody).name === "string"
  );
}

export interface WriteReqBody extends TerminalReqBody {
  file: string;
  contents: string;
  numBytes?: number;
  offset?: number;
  append?: boolean;
}

// Type guard for WriteReqBody
export function isWriteReqBody(obj: unknown): obj is WriteReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as WriteReqBody).file === "string" &&
    "contents" in obj &&
    typeof (obj as WriteReqBody).contents === "string"
  );
}
