"use client"
import { ConfigProvider, Input, Modal, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { Task } from "@/interface/Task";
import useSWR from "swr";
import { deleteTask, getAllTask, testNotif } from "@/constants/general";
import { AxiosFetcher } from "@/functions/AxiosFetcher";
import { TitleCard } from "./components/TitleCard";
import { useRouter } from 'next/navigation'
import axios from "axios";

export default function Home() {

  const [messageApi, contextHolder] = message.useMessage();

  const [selectedActive, setSelectedActive] = useState<number>();

  const [selectedNote, setSelectedNote] = useState<Task>();

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<Task[]>(getAllTask, AxiosFetcher);

  const router = useRouter();

  function successMsg(content: string) {
    messageApi.open({
      type: 'success',
      content: content,
    });
  }

  async function deleteTaskOperation() {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${deleteTask}/${selectedNote?._id}`);
      if (response.status === 201) {
        setDeleteModal(false);
        setDeleteLoading(false);
        successMsg('Delete Succeed');
        setSelectedActive(undefined);
        setSelectedNote(undefined);
        mutate();
      }
    } catch (error) {
      setDeleteLoading(false);
    }
  }

  return (
    <main className="bg-gray-900 flex-1 flex flex-row">
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: '#374151',
            colorText: 'white'
          }
        }}
      >
        {contextHolder}
      </ConfigProvider>
      <div className="w-72 min-h-screen bg-gray-950 p-3">
        <div>
          <p className="text-xl py-3 ml-2">All Notes</p>
          <Input placeholder="Search notes title" className="bg-gray-700 border-gray-950 text-white focus:border-cyan-300" ></Input>
        </div>
        <div className="flex flex-col mt-3 max-h-96 overflow-y-auto">
          {error && <p>Error to get data, please check connection</p>}
          {
            isLoading || deleteLoading ?
              <Spin size="large" className="m-auto" />
              :
              data?.map((item, idx) => {
                return (
                  <TitleCard
                    onDelete={() => setDeleteModal(true)}
                    onEdit={() => router.push(`/update?id=${item._id}&title=${item.title}&desc=${item.description}&date=${item.datetime}`)}
                    idx={item._id}
                    allDataIndex={data.map(allIds => allIds._id)}
                    key={idx}
                    title={item.title}
                    isActive={selectedActive === idx ? true : false}
                    onPress={() => {
                      if (idx === selectedActive) {
                        setSelectedActive(undefined);
                        setSelectedNote(undefined);
                      }
                      else {
                        setSelectedActive(idx);
                        setSelectedNote(item);
                      }
                    }} />
                )
              })
          }
        </div>
      </div>
      <div className="w-80 min-h-screen p-3">
        <p className="text-xl py-3">{selectedNote?.title}</p>
        {selectedNote &&
          <div className="p-3 bg-gray-950 rounded-md">
            <p>{selectedNote?.description}</p>
          </div>
        }
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: '#374151',
            colorText: 'white',
          }
        }}
      >
        <Modal
          title="Are you sure to delete the task ?"
          centered
          open={deleteModal}
          onOk={deleteTaskOperation}
          onCancel={() => setDeleteModal(false)}
          okButtonProps={{
            style: {
              borderColor: '#67E8F9',
              boxShadow: 'none',
            },
          }}
          bodyStyle={{
            accentColor: 'red'
          }}
        >
          <p>Are you sure to delete <b>{selectedNote?.title}</b> ?</p>
        </Modal>
      </ConfigProvider>
    </main>
  )
}
