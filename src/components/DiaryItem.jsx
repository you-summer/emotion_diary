import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image.js";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App.jsx";
import { useContext } from "react";
import useSweetAlertOnDelete from "../hooks/useSweetAlertOnDelete.jsx";

const DiaryItem = ({ id, emotionId, content, createdDate, img }) => {
  const nav = useNavigate();
  // const { onDelete } = useContext(DiaryDispatchContext);

  const onClickDelete = useSweetAlertOnDelete();

  return (
    <div className="DiaryItem">
      <div className="title_section">
        <div
          className="info_section"
          onClick={() => {
            nav(`/diary/${id}`);
          }}
        >
          <div className="info_section_date_emotion">
            <img src={getEmotionImage(emotionId)} className="emotion_Id" />
            <div className="created_date">
              {new Date(createdDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="button_section">
          <Button
            text={"✏️"}
            onClick={() => {
              nav(`edit/${id}`);
            }}
            updel={"updel"}
          />
          <Button
            text={"🗑️"}
            updel={"updel"}
            onClick={() => onClickDelete(id)}
          />
        </div>
      </div>

      <div className="content_section">
        {img ? (
          <div
            className={`img_section`}
            onClick={() => {
              nav(`/diary/${id}`);
            }}
          >
            <img src={img} className="thumbnailImg" />
          </div>
        ) : (
          ""
        )}

        <div
          className="content"
          onClick={() => {
            nav(`/diary/${id}`);
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};
export default DiaryItem;
