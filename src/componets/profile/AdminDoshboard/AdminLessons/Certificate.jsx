import React, { useState } from "react";

function Certificate({ correctPercentage: score, fannomi }) {
  const finish = JSON.parse(localStorage.getItem("isFinish")) || 0; // ✅ Agar yo'q bo'lsa 0 qo'yamiz
  const userdata = JSON.parse(localStorage.getItem("myArray"));

  const name = userdata?.firstname;
  const surname = userdata?.lastname;
  const group = userdata?.group;

  const [loading, setLoading] = useState(false); // 🚀 Loading holati

  const downloadCertificate = async () => {
    setLoading(true); // ✅ Yuklanishni boshlash
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
    } finally {
      setLoading(false); // ⏳ Yuklanish tugadi
    }
  };

  console.log("FINISH",finish);
  console.log("score",score);
  
  return (
    <div>
      {/* Faqat test tugatilgan va natija 60+ bo'lsa tugmani chiqaramiz */}
      {finish == 1 && score >= 60 ? ( // ✅ finishni "1" yoki "true" deb tekshiramiz
        <button
          onClick={downloadCertificate}
          className="gradinet px-6 py-2 mt-6 text-white font-bold rounded-sm"
          disabled={loading} // 🛑 Tugma yuklanish paytida o'chadi
        >
          {loading ? "Yuklanmoqda..." : "Sertifikatni Yuklab olish"}
        </button>
      ) : (
        <p className="text-red-500 mt-6"></p>
      )}
    </div>
  );
}

export default Certificate;
