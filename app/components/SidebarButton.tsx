import React from 'react';
import Link from 'next/link';

export const SidebarButton: React.FC<{
    icon: JSX.Element
    title: string
    onPress: () => void
    active: boolean
    path: string
}> = ({
    icon,
    title,
    onPress,
    active,
    path
}) => {
        if (active) {
            return (
                <Link href={path} className='flex items-center bg-cyan-300 rounded-lg px-3 mt-3 text-black' onClick={onPress}>
                    {icon}
                    <li className="py-2 ml-2">{title}</li>
                </Link>
            )
        }

        return (
            <Link href={path} className='flex items-center mt-3 px-3' onClick={onPress}>
                {icon}
                <li className="py-2 ml-2">{title}</li>
            </Link>
        );
    };
