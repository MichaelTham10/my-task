"use client"
import { taskSchema } from "@/constants/taskValidationSchema";
import { Task } from "@/interface/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfigProvider, DatePicker, Input, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const InputForm: React.FC<{
    title: string;
    onSubmit: (req: Task | undefined) => void;
    loading: boolean;
    updatedTask?: Task | undefined;
}> = ({
    title,
    onSubmit,
    loading,
    updatedTask
}) => {

        const { handleSubmit, formState: { errors }, setValue, watch } = useForm<Task>({
            resolver: zodResolver(taskSchema)
        });

        useEffect(() => {
            if (updatedTask) {
                setValue('title', updatedTask.title);
                setValue('description', updatedTask.description);
                setValue('datetime', updatedTask.datetime);
            }
        }, [setValue, updatedTask]);

        return (
            <div>
                <p className="text-xl py-3 ml-2">{title}</p>
                <div className="p-2">
                    <form onSubmit={handleSubmit(req => onSubmit(req))}>
                        <div>
                            <label>Title</label>
                            <Input value={watch('title')} onChange={(e) => setValue('title', e.target.value)} placeholder="Input title" className="bg-gray-700 mt-1 border-gray-950 text-white focus:border-cyan-300 placeholder-gray-400" ></Input>
                            {errors.title && <label className="text-red-300">{errors.title.message}</label>}
                        </div>
                        <div>
                            <label>Description</label>
                            <TextArea value={watch('description')} onChange={(e) => setValue('description', e.target.value)} placeholder="Input description" className="bg-gray-700 mt-1 border-gray-950 text-white focus:border-cyan-300 placeholder-gray-400" ></TextArea>
                            {errors.description && <label className="text-red-300">{errors.description.message}</label>}
                        </div>
                        <div>
                            <label>When</label>
                            <br></br>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorText: 'white',
                                        colorTextPlaceholder: '#9CA3AF',
                                        colorBgElevated: 'black',
                                        colorIcon: 'white',
                                        colorTextDisabled: '#9CA3AF',
                                    }
                                }}
                            >
                                <DatePicker
                                    value={dayjs(watch('datetime'))}
                                    onChange={(e) => setValue('datetime', e?.toDate())}
                                    className="flex bg-gray-700 mt-1 border-gray-950 focus:border-cyan-300"
                                    size="middle"
                                    placeholder="Input date"
                                    disabledDate={d => !d || d.isBefore(Date.now())}
                                />
                            </ConfigProvider>
                            {errors.datetime && <label className="text-red-300">{errors.datetime.message}</label>}
                        </div>
                        <button type="submit" className="block mt-5 border text-cyan-300 bg-gray-950 border-cyan-300 mr-0 ml-auto py-2 px-5 rounded-md">
                            {loading ?
                                <Spin />
                                :
                                <>Submit</>
                            }
                        </button>
                    </form>
                </div>
            </div>
        )
    }