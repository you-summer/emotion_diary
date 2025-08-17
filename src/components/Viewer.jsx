import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image.js";
import { emotionList } from "../util/constans.js";
import { useContext } from "react";
import { IsDarkContext } from "../App.jsx";

const Viewer = ({ emotionId, content, img }) => {
  const emotionItem = emotionList.find((item) => {
    return item.emotionId === emotionId;
  });

  const { isDark } = useContext(IsDarkContext);

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>
          ✨ 오늘의 <span>기분 : {emotionItem.emotionName}</span>
        </h4>
        <div className="emotion_section">
          <img src={getEmotionImage(emotionId)} />
          {/* <div>{emotionItem.emotionName}</div> */}
        </div>
      </section>
      <section>
        <div className="emotion_img_wrapper">
          {/* <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div> */}
          {!img ? "" : <img src={img} className="imgView" />}
        </div>
      </section>
      <section className={`content_section ${isDark ? "contentDark" : ""}`}>
        <h4>📖 오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};
export default Viewer;
