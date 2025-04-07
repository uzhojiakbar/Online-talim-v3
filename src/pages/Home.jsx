import React, { useEffect } from "react";
import Headers from "../componets/Headers/Headers";
import Navbar from "../componets/Navbar/Navbar";
import Homesection1 from "../componets/HomeSection/Homesection1";
import Footer from "../componets/Footer/Footer";
function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Headers />
      <Homesection1 />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
