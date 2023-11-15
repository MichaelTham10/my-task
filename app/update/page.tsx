"use client"
import { updateTask } from "@/constants/general";
import { Task } from "@/interface/Task";
import { message } from "antd";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { InputForm } from "../components/InputForm";

export default function UpdatePage() {

    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();

    const id = searchParams.get('id');

    const title = searchParams.get('title');

    const description = searchParams.get('desc');

    const datetime = searchParams.get('date');

    let updatedTask: Task | undefined;

    if (id && title && description && datetime) {
        updatedTask = {
            _id: id,
            datetime: new Date(datetime),
            description: description,
            title: title,
        }
    }

    function successMsg() {
        messageApi.open({
            type: 'success',
            content: 'Update Succeed',
            onClose: () => router.push('/'),
            duration: 0.5,
        });
    }

    async function onSubmit(id: string | null, req: Task | undefined) {
        setLoading(true);
        try {
            const response = await axios.patch(updateTask + `/${id}`, req)
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
                onSubmit={req => onSubmit(id, req)}
                title="Update Task"
                loading={loading}
                updatedTask={updatedTask}
            />
        </main>
    )
}