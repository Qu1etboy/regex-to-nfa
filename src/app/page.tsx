"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import axios from "axios";
import { instance } from "@viz-js/viz";
import toast from "react-hot-toast";

type NFA = {
  start: string;
  final: string;
  states: string[];
  symbols: string[];
  transitions: {
    [key: string]: {
      [key: string]: string[];
    };
  };
};

export default function Home() {
  const [data, setData] = useState<NFA>();
  const [regex, setRegex] = useState("");
  const [loading, setLoading] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);

  async function regexToNFA(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (graphRef.current) {
      graphRef.current.innerHTML = "";
    }

    try {
      const { data } = await axios.get(
        `https://pacific-keen-variraptor.glitch.me/nfa?regex=${regex}`
      );
      console.log(data);

      setData(data);
      await drawGraph(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("There was an error from the server. Please try again.");
      setLoading(false);
    }
  }

  function dot(nfa: NFA) {
    const transitions = Object.keys(nfa.transitions).map((state) => {
      return Object.keys(nfa.transitions[state])
        .map((symbol) => {
          return nfa.transitions[state][symbol]
            .map((toState) => {
              // console.log(`${state} -> ${toState} [label="${symbol}"]`);
              return `${state} -> ${toState} [label="${symbol}"]`;
            })
            .join("\n");
        })
        .join("\n");
    });

    return `digraph {
      rankdir=LR
      node [shape=circle]
      start -> ${nfa.start}
      ${transitions.join("\n")}
      ${nfa.final} [shape=doublecircle]
    }`;
  }

  async function drawGraph(nfa: NFA) {
    const viz = await instance();
    const d = dot(nfa);
    const svg = viz.renderSVGElement(d);

    if (!graphRef.current) return;

    graphRef.current.innerHTML = "";
    graphRef.current.appendChild(svg);
  }

  return (
    <main className="container mx-auto px-2">
      <header className="text-center my-6">
        <h1 className="text-3xl font-bold">Regex to NFA Converter</h1>
        <p className="text-gray-700">McNaughton-Yamada-Thompson algorithm</p>
      </header>
      <form onSubmit={regexToNFA} className="my-6">
        <label
          htmlFor="regex"
          className="block text-sm font-medium text-gray-900"
        >
          Regular Expression
        </label>
        <p className="mb-2 text-xs text-gray-600">
          Except only (, ), |, *, and . operators
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. (a|b)*a.b.c"
            id="regex"
            onChange={(e) => setRegex(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            Convert
          </button>
        </div>
      </form>

      <div className="my-12">
        {loading ? (
          <div role="status" className="flex justify-center items-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : data ? (
          <div className="mb-12">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    State/Symbol
                  </th>
                  {data.symbols.map((symbol, idx) => (
                    <th scope="col" className="px-6 py-3" key={idx}>
                      {symbol}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.states.map((state, idx) => (
                  <tr key={idx} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      key={idx}
                    >
                      {state}
                    </th>
                    {data.symbols.map((symbol, idx) => (
                      <td className="px-6 py-4" key={idx}>
                        {data.transitions[state]
                          ? data.transitions[state][symbol]
                            ? `{${data.transitions[state][symbol]?.join(", ")}}`
                            : "∅"
                          : "∅"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-700">
            Enter regular expression to convert into NFA
          </div>
        )}
        <div ref={graphRef} className="flex justify-center"></div>
      </div>
    </main>
  );
}
