import { useEffect } from "react";
import MainHeader from "@/components/main-header/MainHeader";
import Experience from "@/components/experience/Experience";
import "./home.scss";
import Intro from "@/components/intro/Intro";
import AboutMe from "@/components/about-me/AboutMe";

function Home() {
  useEffect(() => {
    document.title = "Brent Lee";
  }, []);

  return (
    <div className="home-container">
      <MainHeader />
      <Intro />
      <Experience />
      <AboutMe />
    </div>
  );
}

export default Home;
