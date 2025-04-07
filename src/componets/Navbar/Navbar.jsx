import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";
function Navbar() {
  const [navData, setNavda] = useState([
    {
      id: 1,
      name: "Bosh sahifa",
      path: "/#",
    },
    {
      id: 2,
      name: "Darslar",
      path: "/#darslar",
    },
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = useNavigate();

  const ToHome = () => {
    nav("/");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      data-aos="filip-left"
      className={`border-b border-slate-600 backdrop-blur-lg text-white flex top-0 left-0 z-50 fixed w-full  py-4 lg:px-16 sm:px-6 px-3 justify-between items-center bg-black/30`}
    >
      <h1
        onClick={ToHome}
        className="text-3xl select-none font-bold cursor-pointer "
      >
        Unify<span className="text-[#629a62]">.</span>{" "}
      </h1>

      <div className="md:flex hidden gap-6 ">
        {navData?.map((item) => (
          <div className="cursor-pointer sm:px-4 lg:px-8 py-1" key={item?.id}>
            <a href={item?.path}>{item?.name}</a>
          </div>
        ))}
      </div>
      <span className="md:hidden" onClick={() => setOpen(!open)}>
        <MdMenu size={36} />
      </span>
      <div className="md:flex  gap-6 hidden items-center">
        <NavLink to={"/login"}>Kirish</NavLink>
        <NavLink
          to={"/register"}
          onClick={() => setOpenForm(true)}
          className="bg-[#FF6E30] px-6 py-1 rounded-sm hover:bg-[#ab5c37] transition-all"
        >
          Registratsiya
        </NavLink>
      </div>

      {open && (
        <div
          className={`md:hidden  bg-slate-900 z-[1000]  top-0 right-0 w-[70%] fixed transition-all duration-500 p-6 h-[100vh] `}
        >
          <span
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <IoMdClose size={36} />
          </span>
          <div className="md:flex gap-6 space-y-3 mt-10">
            {navData?.map((item) => (
              <div
                className="cursor-pointer  py-1 px-3 rounded-sm hover:bg-slate-800"
                key={item?.id}
              >
                <a href={item?.path}>{item?.name}</a>
              </div>
            ))}
          </div>
          <div className="md:flex grid gap-6 items-center mt-8">
            <NavLink
              to={"/login"}
              className="bg-[#FF6E30]  px-6 py-1 rounded-sm hover:bg-[#da6735] transition-all"
            >
              Kirish
            </NavLink>
            <NavLink
              to={"/register"}
              onClick={() => setOpenForm(true)}
              className="bg-[#FF6E30] px-6 py-1 rounded-sm hover:bg-[#da6735] transition-all"
            >
              Registratsiya
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
