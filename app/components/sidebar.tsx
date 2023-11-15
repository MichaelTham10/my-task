"use client"
import React, { useState } from 'react';
import { CgNotes } from "react-icons/cg"
import { SidebarButton } from './SidebarButton';
import { sidebarMenu } from '@/constants/sidebarMenu';
import { usePathname } from 'next/navigation';

export default function SideBar () {

    const pathname = usePathname();

    return (
        <div className="w-44 min-h-screen bg-gray-800 p-3">
            {/* Konten sidebar */}
            <div className='flex items-center'>
                <CgNotes />
                <p className="text-xl py-3 ml-2">My Task</p>
            </div>
            <ul>
                {sidebarMenu.map((item, idx) => (
                    <SidebarButton
                        icon={item.icon}
                        title={item.title}
                        key={idx}
                        onPress={() => console.log()}
                        active={pathname === item.path}
                        path={item.path}
                    />
                ))}
            </ul>
        </div>
    );
};
