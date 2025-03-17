import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import MavzuData from "../../../../Hooks/MavzuData";
const Dars = () => {
    const { nomi, darsnomi } = useParams();
    const { topicData, load, mavZuMalumotlari } = MavzuData()
    useEffect(() => {
        mavZuMalumotlari(nomi, darsnomi);
    }, [darsnomi]);
    return (
        <div className="mt-6 overflow-hidden">
            {load && (
                <div className="bg-slate-200 absolute z-50 w-full min-h-[100vh] top-0 left-0 flex justify-center items-center ">
                    <ThreeCircles
                        visible={true}
                        height="200"
                        width="100"
                        color="blue"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            {!topicData.name ? <h1 className="text-slate-800 ">Darslar hozircha mavjud emas 😔</h1> :
                <>
                    {!load && (
                        <div className="bg-white p-4 rounded-lg space-y-2">
                            <h1 className="text-xl">{topicData.name}</h1>
                            {<h1>{topicData.desc}</h1>}
                            <div className="iframevid">
                                <div className=""
                                    id="embedContainer"
                                    dangerouslySetInnerHTML={{ __html: topicData.embed, }}>
                                </div>
                            </div>
                        </div>
                    )}
                </>}
        </div>
    );
};

export default Dars;
