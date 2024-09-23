"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NewNote from "@/components/new-note";
import NoteViewer from "@/components/note-viewer";
import EmptyNote from "@/components/empty-note";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function UI() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<
    Database["public"]["Tables"]["note"]["Row"][]
  >([]);

  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("note").select("*").ilike('title',`%${search}%`);

    if (error) {
      alert(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    // supabase.from('note').select('*').then(console.log)
    fetchNotes();
  }, []);

  useEffect(() => {
    // supabase.from('note').select('*').then(console.log)
    fetchNotes();
  }, [search]);

  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar
          search={search}
          setSearch={setSearch}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          notes={notes}
          setIsCreating={setIsCreating}
        />
        {/* New Note */}
        {isCreating ? (
          <NewNote
            fetchNotes={fetchNotes}
            setActiveNoteId={setActiveNoteId}
            setIsCreating={setIsCreating}
          />
        ) : activeNoteId ? (
          <NoteViewer
            fetchNotes={fetchNotes}
            setActiveNoteId={setActiveNoteId}
            note={notes.find((note) => note.id === activeNoteId)}
          />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
