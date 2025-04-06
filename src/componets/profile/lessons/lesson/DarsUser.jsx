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
  const { data: fanMavzulari = [] } = useAddTopic(nomi);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [darsnomi, setDarsnomi] = useState(() => {
    return localStorage.getItem("selectedLesson") || null;
  });

  useEffect(() => {
    if (fanMavzulari.length > 0) {
      const storedLesson = localStorage.getItem("selectedLesson");
      if (storedLesson) {
        navigate(`/profile/${nomi}/${storedLesson}`);
        setDarsnomi(storedLesson);
      } else {
        const firstTopic = fanMavzulari[0].nomi;
        navigate(`/profile/${nomi}/${firstTopic}`);
        setDarsnomi(firstTopic);
        localStorage.setItem("selectedLesson", firstTopic);
      }
    }
  }, [fanMavzulari, nomi, navigate]);

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
      console.log(response.data)
      localStorage.setItem('isFinish', response?.data?.isFinish)
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoad(false);
    }
  };

  const handleSelectLesson = (lesson) => {
    setDarsnomi(lesson);
    localStorage.setItem("selectedLesson", lesson);
    navigate(`/profile/${nomi}/${lesson}`);
  };

  return (
    <Layout className="pt-[60px] min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 text-white">
      <ProfileNavbar />
      <Button
        type="primary"
        onClick={() => setDrawerVisible(true)}
        className="fixed z-[1000] md:hidden top-5 left-4"
      >
        ☰
      </Button>
      <Sider width={350} className="hidden md:block bg-gray-800 border-r border-gray-700">
        <div className="p-6 space-y-4">
          {fanMavzulari.length > 0 ? (
            fanMavzulari.map((item) => (
              <NavLink
                key={item.id}
                to={`/profile/${nomi}/${item.nomi}`}
                onClick={() => handleSelectLesson(item.nomi)}
                className={({ isActive }) =>
                  isActive ? "block bg-blue-600 text-white p-3 rounded-lg" : "block bg-gray-600 text-gray-300 p-3 rounded-lg"
                }
              >
                {item.nomi}
              </NavLink>
            ))
          ) : (
            <p className="text-gray-400">Darslar mavjud emas</p>
          )}
        </div>
      </Sider>
      <Drawer
        className="custom-drawer"
        bodyStyle={{ backgroundColor: "#1E293B" }}
        title="Mavzular ro'yxati"
        headerStyle={{ backgroundColor: "#1E293B", color: 'white' }}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}>

        {fanMavzulari?.map((item) => (
          <NavLink
            key={item.id}
            to={`/profile/${nomi}/${item.nomi}`}
            onClick={() => {
              handleSelectLesson(item.nomi);
              setDrawerVisible(false);
            }}
            className={({ isActive }) =>
              isActive ? "block bg-blue-600 mt-2 text-white p-3 rounded-lg" : "block mt-2 bg-gray-600 text-gray-300 p-3 rounded-lg"
            }
          >
            {item.nomi}
          </NavLink>
        ))}
      </Drawer>
      <Layout>
        <Content className="relative bg-slate-800 p-8">
          {load && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
              <ThreeCircles height="100" width="100" color="blue" />
            </div>
          )}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h1 className="text-2xl font-extrabold mb-4 text-white">{nomi}</h1>
            <p className="text-gray-300">{data?.name}</p>
            <div className="mt-3 text-gray-400">{data?.desc}</div>
            <div
              className="mt-6 iframevid p-1 mb-4 text-white"
              dangerouslySetInnerHTML={{ __html: data?.embed }}
            />
            <NavLink
              to={darsnomi ? `/profile/${nomi}/${darsnomi}/quiz` : "#"}
              className={` bg-blue-600 px-6 py-2 text-white rounded-sm  ${!darsnomi ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Testga o'tish
            </NavLink>
            <Scroltop />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DarsUser;
