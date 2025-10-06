import "./desc-bullet.scss";
import { SECTION, SECTION_BACKGROUND_COLOR } from "@/constants";

function DescBullet({
  section,
  bulletIndex = 0, // use index to switch image and container
  title = "",
  time = "",
  subtitle = "",
  content = "",
  imgUrl = "",
}) {
  // const backgroundColorMap = {
  //   Experience: "white",
  // };
  return (
    <div className="random">
      <img src={imgUrl} className="logo" />
      <div className={`desc-bullet-${SECTION_BACKGROUND_COLOR[section]}`}>
        {title && (
          <div className="title-time-container">
            {title && <span className="title">{title}</span>}
            {time && <span className="time">{time}</span>}
          </div>
        )}
        {subtitle && <div className="subtitle">{subtitle}</div>}
        {content && (
          <div className="content">
            {Array.isArray(content) ? (
              <ul>
                {content.map((li) => (
                  <li>{li}</li>
                ))}
              </ul>
            ) : (
              content
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DescBullet;
