import { useState } from "react";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constans";

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [emotionType, setEmotionType] = useState("0");

  const onChnageSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };
  const sortedDate = getSortedData();

  const onChangeEmotionType = (e) => {
    setEmotionType(e.target.value);
  };

  const getChangeEmotionData = () => {
    return sortedDate.filter((item) => {
      return emotionType === "0"
        ? true
        : String(item.emotionId) === String(emotionType);
    });
  };

  const sortedEmotionData = getChangeEmotionData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <div className="diary_length">
          📖 일기 <span>{String(sortedEmotionData.length)}</span> 개
        </div>
        <div className="menu_bar_select">
          <select onChange={onChnageSortType}>
            <option value={"latest"}>최신순</option>
            <option value={"oldest"}>오래된 순</option>
          </select>
          <select onChange={onChangeEmotionType}>
            <option value={"0"}>전체보기</option>
            {emotionList.map((item) => (
              <option key={item.emotionId} value={`${item.emotionId}`}>
                {item.emotionName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="list_wrapper">
        {sortedEmotionData.map((item) => {
          return <DiaryItem key={item.id} {...item} />;
        })}
      </div>
      <div className="menu_bar">
        <Button
          type={"POSITIVE"}
          text={"새 일기 쓰기"}
          onClick={() => {
            nav(`/new`);
          }}
          fixed={"fixed"}
        />
        <Button text={"📊"} setting={"setting"} />
      </div>
    </div>
  );
};
export default DiaryList;
