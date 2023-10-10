import React from 'react';

export const TitleCard: React.FC<{
    title: string;
    onPress: () => void;
    isActive: boolean;
}> = ({
    title, isActive, onPress
}) => {
        if (isActive) {
            return (
                <button className="bg-gray-300 rounded-md p-5 my-2 text-left" onClick={onPress}>
                    <p>{title}</p>
                </button>
            )
        }

        return (
            <button className="bg-gray-800 rounded-md p-5 my-2 text-left" onClick={onPress}>
                <p>{title}</p>
            </button>
        );
    };
