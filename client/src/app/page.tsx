import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-1">
      <header className="flex bg-amber-400/10 p-4 w-1/3 items-center justify-center rounded-sm  border-black border-1">
        <h1 className="bg-blue text-2xl font-bold text-center text-gray-300 text-shadow-black">
          File System
        </h1>
      </header>
      <main className="flex flex-col gap-[32px] items-center sm:items-start font-[family-name:var(--font-noto-sans-mono)] p-10 ">
        <Terminal />
      </main>
    </div>
  );
}
