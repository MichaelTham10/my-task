import { SidebarMenu } from "@/interface/SidebarMenu";
import { FaPlus, FaRegStickyNote, FaTrash } from "react-icons/fa";

export const sidebarMenu: SidebarMenu[] = [
    {
        id: 1,
        title: 'All Notes',
        icon: <FaRegStickyNote />,
        path: '/'
    },
    {
        id: 2,
        title: 'Add Note',
        icon: <FaPlus />,
        path: '/add'
    },
    // {
    //     id: 3,
    //     title: 'Trash',
    //     icon: <FaTrash />,
    //     path: '/'
    // },
]