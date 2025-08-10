import Button from "./Button";
import "./Editor.css";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/constans.js";
import { useState, useRef, useEffect } from "react";
import { getStringedDate } from "../util/get-stringed-date.js";

const Editor = ({ onSubmitInput, initData }) => {
  const textareaRef = useRef();
  const nav = useNavigate();

  const [tryInput, setTryInput] = useState(false);
  // 제출하기 버튼 눌렀을때의 상태를 관리하는 ustState
  // 기본값으로는 false
  // 제출하기 버튼 클릭시 -> true -> emotionId === 0 일때 경고메세지가 나온다

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 0,
    content: "",
  });

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
    setTryInput(true);

    if (input.content === "") {
      textareaRef.current.focus();
      return;
    } else if (input.emotionId === 0) {
      return;
    }
    onSubmitInput(input);
  };

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

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
        <h4>
          오늘의 감정
          {tryInput && input.emotionId === 0 ? (
            <span className="emotion_0"> * 감정을 선택해주세요!</span>
          ) : (
            ""
          )}
        </h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return (
              <EmotionItem
                {...item}
                key={item.emotionId}
                isSelected={item.emotionId === input.emotionId}
                onClick2={() =>
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
