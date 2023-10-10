"use client"
import { Input } from "antd";
import { TitleCard } from "./components/TitleCard";
import { useState } from "react";
import { notes } from "@/constants/notes";

export default function Home() {

  const [selectedTitle, setSelectedTitle] = useState(false);

  return (
    <main className="bg-slate-500 flex-1">
      <div className="w-80 min-h-screen bg-gray-950 p-3">
        <div>
          <p className="text-xl py-3 ml-2">All Notes</p>
          <Input placeholder="Search notes title" className="bg-gray-700 border-gray-950 text-white focus:border-cyan-300" ></Input>
        </div>
        <div className="flex flex-col mt-3 max-h-96 overflow-y-scroll">
          {notes.map((item, idx) => {
            return (
              <TitleCard
                key={idx}
                title={item.title}
                isActive={selectedTitle}
                onPress={() => console.log()} />
            )
          })}
        </div>
      </div>
    </main>
  )
}
