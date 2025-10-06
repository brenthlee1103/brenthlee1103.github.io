import { useEffect } from "react";
import MainHeader from "@/components/home-page/main-header/MainHeader";
import Experience from "@/components/home-page/experience/Experience";
import "./home.scss";
import Intro from "@/components/home-page/intro/Intro";
import AboutMe from "@/components/home-page/about-me/AboutMe";
import "@fontsource/inter/600.css";

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
