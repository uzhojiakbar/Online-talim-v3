import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import useFan from '../../../../Hooks/useFan';
import { useAddTopic } from '../../../../Hooks/useAddTopic';
import { delFan } from '../../../../Hooks/delFan';
import { ThreeCircles } from 'react-loader-spinner';
import AdminNav from '../AdminNav';
import TheMainLesson from './TheMainLesson';
import { Button, Modal } from 'antd';
import usedelTopic from '../../../../Hooks/usedelTopic';

function LessonTopic() {
  const { nomi, darsnomi } = useParams();
  const { fan, loading } = useFan();
  const { addTopics, fanMavzulari } = useAddTopic();
  const { deleteDars } = delFan();
  const { delTopic } = usedelTopic();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const [isModalOpen1, setIsModalOpen1] = useState(false);

const handleDeleteFan = () => {
  deleteDars(nomi); 
  setIsModalOpen1(false); 
  nav("/admin"); 
};

  const nav = useNavigate();

  useEffect(() => {
    addTopics(nomi);
    setTimeout(() => {
      if (!darsnomi?.length && fanMavzulari.length > 0) {
        nav(`/admin/${fanMavzulari[0].fan}/${fanMavzulari[0].nomi}`);
      }
    }, 1000);
  }, [fan, darsnomi]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openDeleteModal = (topicName) => {
    setSelectedTopic(topicName);
    setIsModalOpen(true);
  };


  const handleDeleteTopic = () => {
    if (selectedTopic) {
      delTopic(nomi, selectedTopic);
      setIsModalOpen(false);
    }
  };


  return (
    <div className='bg-slate-100 flex relative h-[100vh] overflow-hidden'>
      {loading && (
        <div className='bg-slate-200 absolute z-50 w-full min-h-[100vh] top-0 left-0 flex justify-center items-center'>
          <ThreeCircles visible={true} height="100" width="100" color="blue" />
        </div>
      )}
      <AdminNav />
      <h1 onClick={handleSidebarToggle} className="text-2xl text-black z-[2000] md:hidden fixed left-4 cursor-pointer">
        {sidebarOpen ? "✖" : "☰"}
      </h1>

      <div className={`h-[90vh] mt-[60px] bg-white max-md:w-[70%] w-[25%] overflow-auto fixed transition-transform duration-300 z-[1000] ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-[80%] md:w-[24%]`}>
        <div className='p-2'>
          {fanMavzulari?.map((i) => (
            <div key={i?.id}>
              <NavLink
                to={`/admin/${i?.fan}/${i?.nomi}`}
                className={({ isActive }) =>
                  isActive ? "border-b block p-3 px-3 rounded-sm bg-indigo-500 text-white" : "border-b block p-3 px-3 rounded-sm hover:bg-indigo-500 hover:text-white"
                }>
                <div className='flex justify-between items-center'>
                  <p className='w-full truncate'>{i?.nomi}</p>
                  <span onClick={(e) => { e.preventDefault(); openDeleteModal(i?.nomi); }} className='text-red-500 cursor-pointer'>
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </div>
              </NavLink>
            </div>
          ))}
          <Button className="text-xl p-5 mt-6 text-red-500"
          onClick={() => setIsModalOpen1(true)}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div className="text-xl fa-solid text-[16px] fa-trash text-red"></div>
            <div>Dars Ochirish</div>
          </Button>
        </div>
      </div>

      <Modal
        title="Ogohlantirish"
        open={isModalOpen}
        onOk={handleDeleteTopic}
        onCancel={() => setIsModalOpen(false)}>
        <p className='text-red-500'>{selectedTopic} darsni o‘chirmoqchimisiz? Ushbu darsning barcha ma'lumotlari o‘chiriladi.</p>
      </Modal>
      <Modal
        title="Ogohlantirish"
        open={isModalOpen1}
        onOk={handleDeleteFan} // Tasdiqlash tugmasi bosilganda
        onCancel={() => setIsModalOpen1(false)} // Bekor qilish tugmasi bosilganda
      >
        <p className='text-red-500'>Fanni o‘chirmoqchimisiz?</p>
      </Modal>

      <TheMainLesson />
    </div>
  );
}

export default LessonTopic;
