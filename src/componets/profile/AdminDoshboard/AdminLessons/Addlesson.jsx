import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import useFan from '../../../../Hooks/useFan';
import AddFan from '../../../../Hooks/AddFan';

const { TextArea } = Input;

function Addlesson() {
    const { data: fan, loading, isError } = useFan();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { addFanFunction } = AddFan();
    const handleFormSubmit = (e) => {
        e.preventDefault();

        addFanFunction(subjectName, description);
        setIsModalOpen(false); // Modalni yopish
    };

    const handleFanClick = (nomi) => {
        const selectedFan = fan.find((f) => f.nomi === nomi);
        if (!selectedFan) {
            alert("Bu fan mavjud emas!"); // Foydalanuvchiga xabar chiqarish
            navigate("/admin"); // Admin sahifasiga yo'naltirish
        }
    };

    return (
        <div>
            <Modal
                footer={[
                    <Button
                        onClick={handleFormSubmit}
                        type="primary"
                        className='mt-6 py-4'
                        block
                    >   
                        Qo'shish
                    </Button>,
                ]}
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <Input
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Fan nomi"
                    className='mt-8 py-2'
                />
                <TextArea
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    maxLength={512}
                    showCount
                    className='mt-6'
                    placeholder='Fan tasnifi'
                />
            </Modal>

            <h1 className='text-2xl font-semibold max-sm:text-xl'>Mavjud Fanlar</h1>

            <div className='mt-2 grid lg:grid-cols-3 sm:grid-cols-2 gap-8 grid-cols-1 pb-12'>
                <Button
                    type="primary"
                    className='p-6 rounded-lg shadow-lg h-full'
                    onClick={showModal}
                >
                    <span className='text-5xl text-white'>
                        <i className="fa-solid fa-plus"></i>
                    </span>
                </Button>

                {loading && <div className='loaderWindow'><div className='loader'></div></div>}
                {fan && fan?.map((i, index) => (
                    <NavLink
                        key={index}
                        to={`/admin/${i.nomi ? i.nomi : '/'}`}
                        className="overflow-hidden"
                        onClick={() => handleFanClick(i.nomi)}
                    >
                        <div key={i.nomi} className="card">
                            <a className="card1" href="#">
                                <p style={{ lineHeight: "24px" }}>{i.nomi}</p>
                                <p className="small">{i.desc}</p>
                                <div className='flex justify-between small items-center'>
                                    <p>{i.teacher}</p>
                                </div>
                            </a>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Addlesson
