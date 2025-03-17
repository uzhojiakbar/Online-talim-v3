import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import MonthlyUserStatsChart from "./Chart";
import Addlesson from "./AdminLessons/Addlesson";
import { instance } from "../../../Hooks/api";
import Scroltop from "../../Scroltop";

const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    const getAllusers = async () => {
      try {
        const response = await instance.get("/api/users");
        setUserData(response.data);
      } catch (error) {
        console.error(error, "Malumot olishda Hatolik");
      }
    };
    getAllusers();
  }, []);

  const handleRoleChange = async (username, role) => {
    try {
      const response = await instance.put(`/api/users/${username}`, { role })
      setSelectedRole(response.data.role)
    }
    catch (err) {
      console.log('yangiilashda hatoli keldi', err)
    }
  };

  return (
    <div className="bg-slate-100 min-h-[100vh]">
      <AdminNav />
      <div className="flex-1 p-6 max-sm:px-2 pt-28">
        <Addlesson />
        <div id="manage-users">
          <h3 className="text-2xl font-semibold mb-4 max-sm:text-xl">Foydalanuvchilarni boshqarish</h3>
          <div className="bg-white py-6 p-6 max-sm:px-2 border-gray-300 rounded-lg shadow-lg">
            {userData?.map((item) => (
              <div
                className="bg-slate-100 p-2 rounded-md mt-4 flex flex-wrap justify-between items-center gap-4"
                key={item?._id}
              >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <h1 className="font-medium">{item?.lastname}</h1>
                  <h1 className="font-medium">{item?.firstname}</h1>
                  <h1 className="font-medium">{item?.group}</h1>
                </div>
                <div className="w-full sm:w-auto text-sm text-gray-600">

                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <select
                    defaultValue={item?.role}
                    onChange={(e) => setSelectedRole({ ...selectedRole, [item._id]: e.target.value })}
                    className="border rounded p-2 w-full sm:w-auto"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  <button
                    onClick={() => handleRoleChange(item.username, selectedRole[item._id] || item?.role)}
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Scroltop />
    </div>
  );
};

export default AdminPage;
