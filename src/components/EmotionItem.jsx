import "./EmotionItem.css";
import { getEmotionImage } from "./../util/get-emotion-image.js";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      className={`EmotionItem EmotionItem_on_${
        isSelected ? `${emotionId}` : ""
      }`}
      onClick={onClick}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};
export default EmotionItem;
