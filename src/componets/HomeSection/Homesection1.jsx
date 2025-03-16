import React from 'react';
import att_logo from '../../assets/att_logo.png';
import useFan from '../../Hooks/useFan';
import { NavLink } from 'react-router-dom';

function Homesection1() {
    const { fan, loading, error } = useFan();

    if (loading) return <p className="text-white text-center mt-12 text-2xl">Yuklanmoqda...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!fan || fan?.length === 0) return <h1 className="text-white text-center">Hozircha fanlar mavjud emas</h1>;

    return (
        <div id="darslar" className="lg:p-16 px-4 overflow-hidden">
            <div data-aos="fade-down" data-aos-duration="500" className="text-white text-center">
                <h1 className="text-[48px]">Darsliklar</h1>
                <p className="text-[18px]">Aniq reja bilan yaratilgan darsliklar</p>
            </div>
            <div className="mt-12 p-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                {fan?.map((item, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        className="bg-[#303d46] flex flex-col justify-between text-center gap-3 p-6 rounded-lg text-white"
                    >
                        <div className="bg-white p-4 rounded-full w-24 mx-auto">
                            <img src={att_logo} alt="Logo" />
                        </div>
                        <h1 className="text-[20px] font-bold">{item?.nomi}</h1>
                        <p className="text-[15px] text-[#8ca5bb]">{item?.desc}</p>
                        <NavLink
                            to="/login"
                            className="bg-[#FF6E30] hover:bg-[#df6c3a] w-[70%] mx-auto py-2 rounded-full text-[14px] font-[500]"
                        >
                            Fanga o'tish
                        </NavLink>
                        <h1 className="mt-6">{item?.teacher}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homesection1;
