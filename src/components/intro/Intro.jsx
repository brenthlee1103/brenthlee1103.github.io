import "./intro.scss";
import gifPfp from "@/assets/newpfp.gif";

function Intro() {
  return (
    <section className="intro-section">
      <div className="container">
        <img className="hero-pfp" src={gifPfp} />
        <div className="intro-text">
          <span className="intro-title">Hi, I'm Brent Lee.</span>
          <span className="intro-body">
            I'm a full-stack software engineer with a focus in front-end, open
            to in-office, remote, or hybrid opportunities in Bay Area, CA or
            Orange County, CA.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Intro;
