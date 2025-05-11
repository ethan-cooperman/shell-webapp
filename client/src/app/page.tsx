export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen">
      <header className="flex bg-amber-800 p-4 w-1/3 items-center justify-center">
        <h1 className="bg-blue text-2xl font-bold text-center">File System</h1>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start font-[family-name:var(--font-noto-sans-mono)]">
        <div>This is where the terminal goes</div>
      </main>
    </div>
  );
}
