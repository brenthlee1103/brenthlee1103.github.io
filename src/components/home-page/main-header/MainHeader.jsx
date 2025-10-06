import "./main-header.scss";
import "@fontsource/inter/600.css";
import pfp from "@/assets/profilepic.jpeg";

function MainHeader() {
  return (
    <div className="header">
      <div />
      {/* <img src={pfp} className="header-section profile-pic" /> */}
      <div className="header-section">
        <div className="header-item">
          <a
            className="navbar-item"
            href="https://drive.google.com/file/d/1R9ZwueqR34V5fvyREFjLHfEMB45aum-b/view?usp=sharing"
            target="_blank"
          >
            <i
              className="fa-regular fa-file fa-lg"
              style={{ color: "#000000" }}
            />
            <span style={{ marginLeft: "5px" }}>CV/Résumé</span>
          </a>
        </div>
        <div className="header-item">
          <a
            className="navbar-item"
            href="https://linkedin.com/in/brenthlee"
            target="_blank"
          >
            <i
              className="fa-brands fa-square-linkedin fa-lg"
              style={{ color: "#3273dc" }}
            />
            <span style={{ marginLeft: "5px" }}>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
