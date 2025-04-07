import React, { useState } from "react";
import nammQi from "../assets/nammQi.mp4";
import { NavLink, useNavigate } from "react-router-dom";
import getNotify from "../Hooks/Notify";
import { useRegister } from "../Hooks/useRegister";
import Navbar from "../componets/Navbar/Navbar";
function Register() {
  const [loader, setLoader] = useState(0);
  const nav = useNavigate();
  const [formData, setFormdata] = useState({
    ism: "",
    familiya: "",
    userName: "",
    parol: "",
    tasdiqlash: "",
    gurux: "",
  });
  const { notify } = getNotify();
  const onchange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate } = useRegister(
    () => {
      nav("/profile");
    },
    (error) => {
      if (error?.response?.data?.error === "Foydalanuvchi topilmadi") {
        notify("err", "Hisob topilmadi");
      } else if (error?.response?.data?.error === "Noto'g'ri parol") {
        notify("err", "Parol xato");
      } else {
        notify(
          "err",
          `${error?.response?.data?.detail || "Qandeydur xatolik"}`
        );
      }
    }
  );

  const onSumbit = async (e) => {
    e.preventDefault();
    if (formData.parol !== formData.tasdiqlash) {
      notify("err", "Parollar mos emas");
      return;
    }
    if (formData.parol.length < 6) {
      console.log("minimal parol uzunligi 6 belgidan iborat bolishi kerak");
      notify("err", "parol minimum 6 belgidan kam bolmasligi kerak");
      return;
    }
    const requestData = {
      username: formData.userName,
      password: formData.parol,
      firstname: formData.ism,
      lastname: formData.familiya,
      group: formData.gurux,
      role: "user",
    };
    try {
      await mutate(requestData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [aye, setAye] = useState(false);
  const [aye1, setAye1] = useState(false);
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center">
        <form
          onSubmit={onSumbit}
          className="py-6 sm:py-12 rgb lg:w-[50%] md:w-[80%] w-full sm:mx-6 mx-4 max-sm:px-6 text-white p-6 rounded-lg  gap-6 relative animate-border-draw"
        >
          <NavLink to={"/"} className="text-2xl absolute top-6 ">
            <i className="fa-solid fa-arrow-left"></i>
          </NavLink>
          <h1 className="text-2xl text-center font-semibold">
            Ro'yhatdan O'tish
          </h1>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <label>
                <span>Ism</span>
                <br />
                <input
                  required
                  name="ism"
                  onChange={onchange}
                  type="text"
                  className="mt-1 bg-white text-slate-800 w-full py-1  px-2 outline-none transition-all duration-300  bg-transparent "
                  placeholder="Ismingizni kiriting"
                />
              </label>
              <label>
                <span>Familiya</span>
                <br />
                <input
                  required
                  type="text"
                  onChange={onchange}
                  name="familiya"
                  className="mt-1 bg-white text-slate-800    w-full py-1  px-2 outline-none transition-all duration-300  bg-transparent "
                  placeholder="Familiya"
                />
              </label>
              <label>
                <span>Foydalanuvchi nomi</span>
                <br />
                <input
                  required
                  type="text"
                  onChange={onchange}
                  name="userName"
                  className="mt-1 bg-white text-slate-800   w-full py-1 px-2 outline-none transition-all duration-300  bg-transparent "
                  placeholder="Foydalanuchi nomi"
                />
              </label>
            </div>

            <div className="flex flex-col gap-6">
              <label className="relative">
                <span>Parol</span>
                <br />
                <input
                  required
                  type={aye ? `text` : "password"}
                  onChange={onchange}
                  name="parol"
                  className="mt-1 bg-white text-slate-800    w-full py-1  px-2 outline-none transition-all duration-300  bg-transparent "
                  placeholder=" parol"
                />
                <span
                  onClick={() => setAye(!aye)}
                  className="absolute top-[53%] right-2 cursor-pointer text-[#244760]"
                >
                  {aye ? (
                    <i class="fa-solid fa-eye"> </i>
                  ) : (
                    <i class="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </label>
              <label>
                <span>Porolni tasdiqlash</span>
                <br />
                <input
                  required
                  type={aye1 ? `text` : "password"}
                  onChange={onchange}
                  name="tasdiqlash"
                  className="mt-1 bg-white text-slate-800    w-full py-1  px-2 outline-none transition-all duration-300  bg-transparent "
                  placeholder="Parolni tasdiqlang"
                />
                <span
                  onClick={() => setAye1(!aye1)}
                  className="absolute top-[48%] right-[32px] cursor-pointer text-[#244760]"
                >
                  {aye1 ? (
                    <i class="fa-solid fa-eye"> </i>
                  ) : (
                    <i class="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </label>
              <label className="text-slate-800 mt-1">
                <span className="text-white">Gurux</span>
                <br />
                <select
                  name="gurux"
                  onChange={onchange}
                  id=""
                  className="py-1 w-full"
                >
                  <option value="">Gurux</option>
                  <option value="36-ATT-23">36-Att</option>
                  <option value="35-ATT-23">35-Att</option>
                  <option value="34-ATT-23">34-Att</option>
                  <option value="38-DI">38-DI</option>
                  <option value="39-DI">39-DI</option>
                  <option value="23-DI">23-DI</option>
                </select>
              </label>
            </div>
          </div>
          <button
            type="sumbit"
            className="w-full bg-white mt-6 py-1 text-slate-800 font-semibold"
          >
            Yuborish
          </button>
        </form>

        <video
          autoPlay
          muted
          className="object-cover h-full w-full absolute top-0 left-0 -z-10"
        >
          <source src={nammQi} />
        </video>
      </div>
    </>
  );
}

export default Register;
