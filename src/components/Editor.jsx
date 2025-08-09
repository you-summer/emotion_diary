import Button from "./Button";
import "./Editor.css";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/constans.js";
import { useState, useRef } from "react";

const Editor = ({ onSubmitInput }) => {
  const textareaRef = useRef();
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const getStringedDate = (target) => {
    const year = target.getFullYear();
    let month = target.getMonth() + 1;
    let day = target.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const onChangeInput = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);

    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(e.target.value);
    }

    setInput({ ...input, [name]: value });
  };

  const onSubmit = (input) => {
    if (input.content === "") {
      textareaRef.current.focus();
      return;
    }
    onSubmitInput(input);
    nav("/", { replace: true });
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 일기</h4>
        <input
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
          name="createdDate"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return (
              <EmotionItem
                {...item}
                key={item.emotionId}
                isSelected={item.emotionId === input.emotionId}
                onClick={() =>
                  onChangeInput({
                    target: {
                      name: "emotionId",
                      value: item.emotionId,
                    },
                  })
                }
              />
            );
          })}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          placeholder="오늘은 어땠나요?"
          name="content"
          value={input.content}
          onChange={onChangeInput}
          ref={textareaRef}
        />
      </section>
      <section className="button_section">
        <Button
          text={"취소하기"}
          onClick={() => {
            nav(-1);
          }}
        />
        <Button
          text={"작성완료"}
          type={"POSITIVE"}
          onClick={() => {
            return onSubmit(input);
          }}
        />
      </section>
    </div>
  );
};
export default Editor;
