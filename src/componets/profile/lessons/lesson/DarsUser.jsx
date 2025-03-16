import React, { useEffect, useState } from "react";
import { Layout, Drawer, Button } from "antd";
import ProfileNavbar from "../../Navbar/ProfileNavbar";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useAddTopic } from "../../../../Hooks/useAddTopic";
import { instance } from "../../../../Hooks/api";
import { ThreeCircles } from "react-loader-spinner";
import Scroltop from "../../../Scroltop";

const { Sider, Content } = Layout;

function DarsUser() {
  const { nomi } = useParams();
  const navigate = useNavigate();
  const { fanMavzulari, addTopics } = useAddTopic();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [darsnomi, setDarsnomi] = useState("");

  useEffect(() => {
    addTopics(nomi);
  }, [nomi]);

  // Birinchi darsga yo'naltirish
  useEffect(() => {
    if (fanMavzulari.length > 0) {
      const firstTopic = fanMavzulari[0].nomi;
      if (!darsnomi) {
        setDarsnomi(firstTopic);
        navigate(`/profile/${nomi}/${firstTopic}`);
      }
    }
  }, [fanMavzulari, nomi, darsnomi, navigate]);

  useEffect(() => {
    if (darsnomi) {
      mavZuMalumotlari(darsnomi);
    }
  }, [darsnomi]);


  const mavZuMalumotlari = async (darsnomi) => {
    setLoad(true);
    try {
      const response = await instance.get(`/api/topic/${nomi}/${darsnomi}`);
      setData(response.data);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoad(false);
    }
  };
  localStorage.setItem("finish", (data?.isFinish))

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 text-white">
      <ProfileNavbar />
      <Button
        type="primary"
        onClick={() => setDrawerVisible(true)}
        className="absolute z-[1000] md:hidden top-5 left-4"
      >
        ☰
      </Button>

      {/* Sidebar */}
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        className="hidden md:block bg-gray-800 border-r border-gray-700"
        width="350"
      >
        <div className="p-6 space-y-4">
          <h2 className="text-lg mt-[62px] font-bold text-white border-b border-gray-600 pb-2">
          </h2>
          {fanMavzulari.length > 0 ? (
            <div className=" space-y-2 ">
              {fanMavzulari?.map((item) => (
                <NavLink
                  onClick={() => mavZuMalumotlari(item?.nomi)}
                  key={item?.id}
                  to={`/profile/${nomi}/${item?.nomi}`}
                  className={({ isActive }) =>
                    isActive
                      ? "block bg-blue-600 hover:bg-gray-600 text-white p-3 rounded-lg shadow"
                      : "block bg-gray-600 hover:bg-gray-500 text-gray-300 p-3 rounded-lg"
                  }
                >
                  <p
                    onClick={() => setDarsnomi(item?.nomi)}
                    className="truncate font-medium"
                  >
                    {item?.nomi}
                  </p>
                </NavLink>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Darslar mavjud emas</p>
          )}
        </div>
      </Sider>

      <Drawer
        title="Mavzular ro'yxati"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ backgroundColor: "#1f2937", color: "white" }}
      >
        <div className="space-y-4 ">
          {fanMavzulari.length > 0 ? (
            fanMavzulari?.map((item) => (
              <NavLink
                onClick={() => {
                  mavZuMalumotlari(item.nomi);
                  setDrawerVisible(false);
                }}
                key={item?.id}
                to={`/profile/${nomi}/${item?.nomi}`}
                className={({ isActive }) =>
                  isActive
                    ? " block bg-blue-600 hover:bg-gray-600 text-white p-3 rounded-lg shadow"
                    : "block bg-gray-600 hover:bg-gray-500 text-gray-300 p-3 rounded-lg"
                }
              >
                <p onClick={() => setDarsnomi(item?.nomi)} className="line-clamp-1">
                  {item?.nomi}
                </p>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-400">Darslar mavjud emas</p>
          )}
        </div>
      </Drawer>

      <Layout>
        <Content className="relative bg-slate-800  p-8 max-sm:p-2">
          {load && (
            <div className="bg-slate-200 z-50 w-full h-[100%] z-[100] absolute top-0 left-0 flex justify-center items-center">
              <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="blue"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass="" mavjud
              />
            </div>
          )}
          {fanMavzulari.length === 0 ? (
            <div className="text-center text-gray-400 mt-16">
              <h1 className="text-2xl font-bold">Darslar mavjud emas</h1>
            </div>
          ) : (
            <div className="overflow-y-auto h-full p-2 pt-20">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl lg:text-4xl font-extrabold mb-4 text-white">{nomi}</h1>
                <p className="text-gray-300 text-xl">{data?.name}</p>
                <div className="mt-3 text-gray-400 leading-relaxed">{data?.desc}</div>
                <div
                  className="mt-6 iframevid p-1"
                  id="embedContainer"
                  dangerouslySetInnerHTML={{ __html: data?.embed }}
                />
                <div className="flex">
                  <NavLink
                    to={darsnomi ? `/profile/${nomi}/${darsnomi}/quiz` : "#"}
                    className={`bg-blue-600 px-6 py-2 text-white rounded-sm ml-1 mt-3 hover:bg-blue-600 cursor-pointer ${!darsnomi ? "cursor-not-allowed opacity-50" : ""
                      }`}>
                    Testga o'tish
                  </NavLink>
                </div>
                <Scroltop />
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DarsUser;
