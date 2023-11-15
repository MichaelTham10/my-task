"use client"
import { postTask } from "@/constants/general";
import { Task } from "@/interface/Task";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputForm } from "../components/InputForm";

export default function AddPage() {

    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function successMsg() {
        messageApi.open({
            type: 'success',
            content: 'Create Succeed',
            onClose: () => router.push('/'),
            duration: 0.5,
        });
    }

    async function onSubmit(val: Task | undefined) {
        setLoading(true);
        try {
            const response = await axios.post(postTask, val)
            if (response.status === 201) {
                successMsg();
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    return (
        <main className="bg-gray-900 flex-1 p-3">
            {contextHolder}
            <InputForm
                onSubmit={req => onSubmit(req)}
                title="Add Task"
                loading={loading}
            />
        </main>
    )
}