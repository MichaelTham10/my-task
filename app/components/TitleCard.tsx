"use client"
import React, { useState } from 'react';
import { Menu, type MenuProps } from 'antd';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import SubMenu from 'antd/es/menu/SubMenu';

export const TitleCard: React.FC<{
    idx: string;
    title: string;
    isActive: boolean;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
    allDataIndex: string[] | undefined
}> = ({
    title, onPress, isActive, idx, allDataIndex, onDelete, onEdit
}) => {
        const [openKeys, setOpenKeys] = useState<string[]>([]);

        const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
            const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

            if (latestOpenKey && allDataIndex?.indexOf(latestOpenKey!) === -1) {
                setOpenKeys(keys);
            }
            else {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : keys);
            }
        };

        if (isActive) {
            return (
                <Menu
                    selectedKeys={openKeys}
                    openKeys={openKeys}
                    mode="inline"
                    onOpenChange={(key) => {
                        onOpenChange(key);
                        onPress();
                    }}
                    key={idx}
                    multiple={false}
                    className="bg-cyan-300 rounded-md my-2 text-left text-black"
                >
                    <SubMenu
                        title={title}
                    >
                        <Menu.Item icon={<FaRegEdit />}  onClick={onEdit} >
                            Edit Task
                        </Menu.Item>
                        <Menu.Item icon={<FaTrash />}  onClick={onDelete}>
                            Delete Task
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            );
        }

        return (
            <Menu
                mode="inline"
                onOpenChange={(key) => {
                    onOpenChange(key);
                    onPress();
                }}
                key={idx}
                multiple={false}
                className="bg-gray-800 rounded-md my-2 text-left text-white"
            >
                <SubMenu
                    title={title}
                >
                    <Menu.Item icon={<FaRegEdit />}>
                        Edit Task
                    </Menu.Item>
                    <Menu.Item icon={<FaTrash />}>
                        Delete Task
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    };
