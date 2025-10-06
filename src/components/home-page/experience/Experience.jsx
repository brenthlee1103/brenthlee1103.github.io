import "./experience.scss";
import SectionHeader from "@/components/home-page/section-container/SectionHeader";
import DescBullet from "@/components/home-page/desc-bullet/DescBullet";
import { SECTION, experiences } from "@/constants";

function Experience() {
  return (
    <section className="experience-section">
      <SectionHeader title={SECTION.EXPERIENCE} />
      {experiences.map((experience, index) => {
        return (
          <DescBullet
            key={index}
            section={SECTION.EXPERIENCE}
            // bulletIndex={index}
            title={experience.title}
            time={experience.time}
            subtitle={experience.subtitle}
            content={experience.content}
            imgUrl={experience.imgUrl}
          />
        );
      })}
    </section>
  );
}

export default Experience;
