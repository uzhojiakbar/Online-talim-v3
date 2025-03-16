import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ADDTopic from './ADDTopic';
import { Button, Modal, Input } from 'antd';
import Dars from './Dars';
import MavzuData from '../../../../Hooks/MavzuData';
import updateTopic from '../../../../Hooks/updateTopic';
import usedelTopic from '../../../../Hooks/usedelTopic';
const { TextArea } = Input;

function TheMainLesson() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setupdateModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const updateshowModal = () => {
    setupdateModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updatehandleCancel = () => {
    setupdateModalOpen(false);
  };

  const { AddNewMavzu } = ADDTopic();
  const [newLesson, setNewLesson] = useState({ name: "", desc: "", embed: "" });

  const onchange = (e) => {
    setNewLesson({ ...newLesson, [e.target.name]: e.target.value });
  };

  const { nomi, darsnomi } = useParams();

  const { topicData, mavZuMalumotlari } = MavzuData();

  // Ma'lumotlar yuklanishi
  useEffect(() => {
    mavZuMalumotlari(nomi, darsnomi);
  }, [darsnomi, nomi]);

  // Mavzuni yangilash
  const { updateFunctons } = updateTopic();
  const [updateData, setUpdateData] = useState({
    name: "",
    desc: "",
    embed: "",
  });

  // topicData kelguncha ishlamaydigan default qiymatlar bilan
  useEffect(() => {
    if (topicData) {
      setUpdateData({
        name: topicData?.name || '',
        desc: topicData?.desc || '',
        embed: topicData?.embed || '',
      });
    }
  }, [topicData]);

  const updatechange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Delete mavzu

  // Ma'lumotlar kelmaguncha formani rendermaslik
  if (!topicData) {
    return <div>Loading...</div>; // topicData kelganini kutish
  }

  // Update funksiyasini faqat kerakli ma'lumotlar bo'lsa chaqirish
  const handleUpdate = () => {
    if (!topicData) {
      alert("Mavzu topilmadi!");
      return;
    }

    if (nomi && darsnomi) {
      updateFunctons(nomi, darsnomi, updateData);
    } else {
      alert("Ma'lumotlar yetarli emas!");
    }
  };

  const nav = useNavigate();
  const navigate = () => {
    nav(`/admin/${nomi}/${darsnomi}/quizAmin`)
  }

  return (
    <div className="bg-slate-100 w-[100%] pt-24 p-8 overflow-auto max-md:pl-8 pl-[27%]">
      <h1 className="text-3xl mb-4">{nomi}</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px] mt-[20px] overflow-auto">
        <Button onClick={showModal}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div className="fa-solid text-[16px] fa-plus text-black"></div>
          <div>Dars qoshish</div>
        </Button>
        <Button onClick={updateshowModal}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div className="fa-solid text-[16px] fa-edit text-[orange]"></div>
          <div>Tahrirlash</div>
        </Button>


        <Button

          onClick={navigate}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div className="fa-solid text-[16px] fa-plus text-[blue]"></div>
          <div>Test qo'shish</div>
        </Button>
      </div>

      {/* Modal - Mavzu qo'shish */}
      <Modal footer={[
        <Button onClick={() => AddNewMavzu(newLesson, nomi)} type="primary" className="mt-6 py-4" block>
          Yuborish
        </Button>
      ]} open={isModalOpen} onCancel={handleCancel}>
        <Input onChange={onchange} name="name" placeholder="Mavzu nomi" className="mt-8 py-2" />
        <Input onChange={onchange} name="embed" placeholder="Link" className="mt-8 py-2" />
        <TextArea onChange={onchange} name="desc" rows={4} maxLength={1024} showCount className="mt-6" placeholder="Dars tasnifi" />
      </Modal>


      {/* Modal - Mavzu tahrirlash */}
      <Modal footer={[
        <Button onClick={handleUpdate} type="primary" className="mt-6 py-4" block>
          Yuborish
        </Button>
      ]} open={updateModalOpen} onCancel={updatehandleCancel}>
        <Input
          onChange={updatechange}
          name="name"
          placeholder="yangi mavzu nomi"
          className="mt-8 py-2"
          defaultValue={updateData?.name || ''} // defaultValue ishlatish
        />
        <Input
          onChange={updatechange}
          name="embed"
          placeholder="yangi link"
          className="mt-8 py-2"
          defaultValue={updateData?.embed || ''} // defaultValue ishlatish
        />
        <TextArea
          onChange={updatechange}
          name="desc"
          rows={4}
          maxLength={1024}
          showCount
          className="mt-6"
          placeholder="Dars tasnifi"
          defaultValue={updateData?.desc || ''} // defaultValue ishlatish
        />
      </Modal>

      {/* ENG ASOSIY QISM */}
      <Dars />
    </div>
  );
}

export default TheMainLesson;
