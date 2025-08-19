import Button from "./Button";
import "./Editor.css";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/constans.js";
import { useState, useRef, useEffect, useContext } from "react";
import { getStringedDate } from "../util/get-stringed-date.js";
import { MoonLoader } from "react-spinners";
import { IsDarkContext } from "../App.jsx";

const CLOUD_NAME = "ds9vjbe25"; // Cloudinary 클라우드 이름
const UPLOAD_PRESET = "diary_preset"; // Unsigned 업로드 프리셋

const Editor = ({ onSubmitInput, initData }) => {
  const textareaRef = useRef();
  const emotionRef = useRef();
  const nav = useNavigate();
  const { isDark } = useContext(IsDarkContext);

  const [tryInput, setTryInput] = useState(false);
  // 제출하기 버튼 눌렀을때의 상태를 관리하는 ustState
  // 기본값으로는 false
  // 제출하기 버튼 클릭시 -> true -> emotionId === 0 일때 경고메세지가 나온다
  const [imageInput, setImageInput] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 0,
    content: "",
    img: null,
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
    }
    if (input.emotionId === 0) {
      emotionRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    onSubmitInput(input);
  };

  useEffect(() => {
    console.log("이닛데이터", initData);
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
      setImageInput(initData.img);
    }
  }, [initData]);

  // cloudinary 사용
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) {
        throw new Error("업로드 실패" + res.status);
      }

      const data = await res.json();
      console.log("res", res);
      console.log("이미지", data);
      return data.secure_url; // 업로드 후 URL 반환
    } catch (error) {
      console.error("cloudinary업로드에러 : ", error);
      throw error;
    }
  };

  //이미지추가
  const onChangeImage = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
      setImgLoading(false); // 스피너만 끄고 기존 이미지 유지
      return;
    }
    setImageInput(null);
    setImgLoading(true); //이미지 읽기 시작 로딩 true

    try {
      const url = await uploadToCloudinary(imageFile);
      console.log("url", url);
      setInput({ ...input, img: url });
      setImageInput(url); // 읽은 내용을 state에 저장
    } catch (error) {
      alert("이미지 업로드에 실패했습니다 다시 시도해주세요!");
    }

    setImgLoading(false);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>📆 오늘은? </h4>
        <div className="date_section_div">
          <input
            type="date"
            value={getStringedDate(input.createdDate)}
            onChange={onChangeInput}
            name="createdDate"
          />
        </div>
      </section>
      <section className="emotion_section">
        <h4 ref={emotionRef}>
          🙌 오늘의 감정
          {tryInput && input.emotionId === 0 ? (
            <span className="emotion_0">* 감정을 선택해주세요!</span>
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
      <section className={`content_section ${isDark ? "EditorDark" : ""}`}>
        <div className="content_title_section">
          <h4>📖 오늘의 일기</h4>
          <div className={`content_section_div`}>
            <label htmlFor="imgFile">
              <span>📂이미지 업로드하기</span>
            </label>
            <input
              id="imgFile"
              type="file"
              accept="image/*"
              onChange={onChangeImage}
              name="img"
            />
          </div>
        </div>
        <div className="content_section_img">
          {!imageInput ? (
            ""
          ) : (
            <img src={imageInput} className="image_preview" />
          )}
          {imgLoading ? (
            <div className="img_loading">
              <MoonLoader size={20} />{" "}
            </div>
          ) : (
            ""
          )}
        </div>
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
