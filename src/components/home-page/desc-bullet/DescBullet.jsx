import "./desc-bullet.scss";
import { SECTION, SECTION_BACKGROUND_COLOR } from "@/constants";

function DescBullet({
  section,
  title = "",
  time = "",
  subtitle = "",
  content = "",
  imgUrl = "",
  link = "",
}) {
  // const backgroundColorMap = {
  //   Experience: "white",
  // };

  const addHref = (s, url) =>
    s.replace(
      /<a(?![^>]*\bhref=)([^>]*)>/gi,
      (_, attrs) => `<a target='_blank' href="${url}"${attrs}>`
    );

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
                  <li dangerouslySetInnerHTML={{ __html: addHref(li, link) }} />
                ))}
              </ul>
            ) : (
              addHref(content, link)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DescBullet;
