import React from "react";
import { NavLink } from "react-router-dom";
import { useFan } from "../../../Hooks/useFan";

function Leson() {
  const { fan, setFan } = useFan();

  return (
    <div className="px-3 sm:px-6 md:px-12 mt-6 grid lg:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1">
      {fan?.length ? (
        fan?.map((v) => (
          <NavLink
            to={`/profile/${v.nomi}`}
            key={v.nomi}
            className="bg-slate-800 p-6 rounded-lg h-full shadow-lg hover:shadow-xl transition duration-300"
          >
            <div>
              <h1 className="text-2xl font-bold text-white mb-3 text-ellipsis">
                {v.nomi}
              </h1>
              <p className="text-slate-300">{v.desc}</p>
            </div>
            <div className="pt-4">
              <p className="text-xl text-gray-400">Ustoz {v.teacher}</p>
            </div>
          </NavLink>
        ))
      ) : (
        <h1 className="text-xl">Fanlar mavjud emas</h1>
      )}
    </div>
  );
}

export default Leson;