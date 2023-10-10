// components/Sidebar.js
import React from 'react';
import { FaRegStickyNote, FaTrash } from "react-icons/fa";
import { CgNotes } from "react-icons/cg"
import { BsGear } from "react-icons/bs"

export const Sidebar = () => {
    return (
        <div className="w-44 min-h-screen bg-gray-800 p-3">
            {/* Konten sidebar */}
            <div className='flex items-center'>
                <CgNotes />
                <p className="text-xl py-3 ml-2">My Task</p>
            </div>
            <ul>
                <button className='flex items-center focus:bg-cyan-300 focus:rounded-lg px-3 focus:text-black'>
                    <FaRegStickyNote />
                    <li className="py-2 ml-2">All Notes</li>
                </button>
                <button className='flex items-center focus:bg-cyan-300 focus:rounded-lg px-3 focus:text-black'>
                    <FaTrash />
                    <li className="py-2 ml-2">Trash</li>
                </button>
                <button className='flex items-center focus:bg-cyan-300 focus:rounded-lg px-3 focus:text-black'>
                    <BsGear />
                    <li className="py-2 ml-2">Settings</li>
                </button>
            </ul>
        </div>
    );
};
