"use client";
import React, { useState, useRef, useEffect, ReactEventHandler } from "react";
import { TerminalEntry } from "@/types/terminalEntry";

function Terminal() {
  // state for entries list
  const [entries, setEntries] = useState<TerminalEntry[]>([]);

  // index in the history that the user wants to see (from the last element)
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

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

  // handle arrow keys to look up input history
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // move back or forward in history if there is another place in history to go
    if (e.key === "ArrowUp") {
      setHistoryIdx((oldIdx) => {
        // calculate index after this keypress
        const newIdx = oldIdx < entries.length - 1 ? oldIdx + 1 : oldIdx;

        // if we need to change the input, do it
        if (terminalInputRef.current && newIdx !== oldIdx) {
          terminalInputRef.current.value =
            entries[entries.length - 1 - newIdx].input;
        }

        // update new index
        return newIdx;
      });
    } else if (e.key === "ArrowDown") {
      setHistoryIdx((oldIdx) => {
        // calculate index after this keypress
        const newIdx = oldIdx > -1 ? oldIdx - 1 : oldIdx;

        // if we need to change the input, do it
        if (terminalInputRef.current && newIdx > -1) {
          terminalInputRef.current.value =
            entries[entries.length - 1 - newIdx].input;
        } else if (terminalInputRef.current && newIdx === -1) {
          terminalInputRef.current.value = "";
        }

        // update new index
        return newIdx;
      });
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    // ignore defaults
    e.preventDefault();

    if (terminalInputRef.current) {
      // get input value
      const inputValue = terminalInputRef.current.value.trim();

      // reset states
      terminalInputRef.current.value = "";
      setHistoryIdx(-1);

      if (!inputValue) {
        return;
      } else if (inputValue.toLowerCase() === "clear") {
        // handle clear command
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
          onKeyDown={handleKeyPress}
        />
      </form>
    </div>
  );
}

export default Terminal;
