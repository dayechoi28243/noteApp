"use client";

import { useState } from "react";

export default function Sidebar({
  notes,
  activeNoteId,
  setIsCreating,
  setActiveNoteId,
  search,
  setSearch,
}) {
  return (
    <aside className="absolute top-0 left-0 bottom-0 w-1/3 overflow-y-scroll p-2 border-r border-gray-300">
      <button
        onClick={() => setIsCreating(true)}
        className="p-2 text-lg font-bold border border-gray-600 rounded-lg w-full"
      >
        + 새로운 노트
      </button>

      <input
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
        type="text"
        placeholder="노트를 검색해보세요."
        className="w-full p-2 rounded-md border-gray-600 mt-2 border font-bold"
      />

      <ul className="mt-2 flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <button
              className={`${activeNoteId === note.id ? "font-bold" : ""}`}
              onClick={() => {
                setActiveNoteId(note.id);
                setIsCreating(false);
              }}
            >
              {note.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
