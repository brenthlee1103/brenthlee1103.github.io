import "./about-me.scss";
import SectionHeader from "@/components/home-page/section-container/SectionHeader";

function AboutMe() {
  return (
    <section className="about-me-section">
      <SectionHeader title="About Me" />
      <div className="timeline-container">
        <div className="timeline-row">
          <div className="timeline-half left">
            <div className="timeline-text">
              <p>I worked at Google right out of college in 2020.</p>
            </div>
          </div>
          <div className="timeline-icon">G</div>
          <div className="timeline-half empty" />
        </div>

        <div className="timeline-row">
          <div className="timeline-half empty" />
          <div className="timeline-icon">🎓</div>
          <div className="timeline-half right">
            <div className="timeline-text">
              <p>
                I studied at California Polytechnic State University, San Luis
                Obispo. I started off as a mechanical engineer in September 2015
                and later switched to computer science my junior year. I
                graduated in March 2020 with a 3.93/4.00 GPA.
              </p>
            </div>
          </div>
        </div>

        <div className="timeline-row">
          <div className="timeline-half left">
            <div className="timeline-text">
              <p>
                In 2014, I worked alongside 2 MIT professors that involved
                research on manipulating sound waves with code using an iPad's
                internal gyroscope as well as Swift during its beta phase.
              </p>
            </div>
          </div>
          <div className="timeline-icon">🧪</div>
          <div className="timeline-half empty" />
        </div>

        <div className="timeline-row">
          <div className="timeline-half empty" />
          <div className="timeline-icon">🎵</div>
          <div className="timeline-half right">
            <div className="timeline-text">
              <p>
                I played violin when I was 4 years old, and for every grade
                since 4th grade through college, I was concertmaster and a
                soloist (Achieved the last Advanced Level in Certificate of
                Merit).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
