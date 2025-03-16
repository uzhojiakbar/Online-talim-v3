import React from "react";

function Certificate({ correctPercentage: score, fannomi }) {
  const finish = JSON.parse(localStorage.getItem("finish"));
  const userdata = JSON.parse(localStorage.getItem("myArray"));

  const name = userdata?.firstname;
  const surname = userdata?.lastname;
  const group = userdata.group;

  const downloadCertificate = async () => {
    const data = {
      isFinish: 1,
      name: name,
      surname: surname,
      fannomi: fannomi,
      score: score,
    };

    try {
      const response = await fetch(
        "http://37.27.215.130:5013/api/test/generate-certificate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Sertifikatni yuklab olishda xatolik!");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificate_${data.surname}_${data.name}.pdf`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Sertifikat yuklab olinmadi!");
    }
  };

  const data = {
    finish,
    name,
    group,
    score,
    fannomi,
  };

  return (
    <div>
      <button
        onClick={() => downloadCertificate(data)}
        className="gradinet px-6 py-2 mt-6  text-white font-bol rounded-sm"
      >
        Sersifikatni Yuklab olish
      </button>
    </div>
  );
}

export default Certificate;