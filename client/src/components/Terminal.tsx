"use client";
import React, { useState, useRef, useEffect } from "react";
import { TerminalEntry } from "@/types/terminalEntry";

function Terminal() {
  // state for entries list
  const [entries, setEntries] = useState<TerminalEntry[]>([]);

  // ref to the input box for ease
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // ref to terminal history scrollable
  const scrollRef = useRef<HTMLOListElement>(null);

  // effect to scroll to bottom of terminal whenever something is entered
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  // set input to focus whenever user clicks
  useEffect(() => {
    const handleClick = () => {
      if (terminalInputRef.current) {
        terminalInputRef.current.focus();
      }
    };

    // add click event listener to entire document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    // ignore defaults
    e.preventDefault();

    if (terminalInputRef.current) {
      // get input value
      const inputValue = terminalInputRef.current.value.trim();

      // reset
      terminalInputRef.current.value = "";

      // handle clear command
      if (inputValue.toLowerCase() === "clear") {
        setEntries([]);
        return;
      }
      // for now, just update the entries array
      setEntries((prevEntries) => [
        ...prevEntries,
        {
          input: inputValue,
          output: "Not Yet Implemented",
          isError: false,
        },
      ]);
    }
  }

  return (
    <div className="relative bg-green-800 w-[80vw] h-[80vh]">
      <ol className="overflow-scroll h-19/20" ref={scrollRef}>
        {entries.map((entry: TerminalEntry, idx: number) => (
          <li
            key={idx}
            className="ww-full h-auto p-2 flex flex-col items-start "
          >
            <div className="w-full flex items-center mb-1">
              <label htmlFor="terminalInput" className="text-white mr-2 w-1/10">
                Input:
              </label>
              <div className="w-full text-white">{entry.input}</div>
            </div>

            <div className="w-full flex items-center">
              <label htmlFor="terminalInput" className="text-white mr-2 w-1/10">
                Output:
              </label>
              <div className="w-full text-white">{entry.output}</div>
            </div>
          </li>
        ))}
      </ol>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 w-full h-1/20 p-1 flex items-center"
      >
        <label
          htmlFor="terminalInput"
          className="left-0 font-semibold text-white mr-2"
        >
          client&gt;
        </label>
        <input
          type="text"
          id="terminalInput"
          name="terminalInput"
          className="w-full p-1 rounded outline-0"
          autoFocus
          ref={terminalInputRef}
          autoComplete="off"
          inputMode="text"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}

export default Terminal;
