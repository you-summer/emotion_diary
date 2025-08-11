import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { getEmotionImage } from "./util/get-emotion-image.js";
import Button from "./components/Button";
import Header from "./components/Header";
import { useReducer, useRef, createContext } from "react";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "/edit" : 일기를 수정하는 Edit 페이지

const mokData = [
  {
    id: 1,
    createdDate: new Date("2025-08-08").getTime(),
    emotionId: 1,
    content: "1오늘의일기",
    img: "",
  },
  {
    id: 2,
    createdDate: new Date("2025-08-10").getTime(),
    emotionId: 2,
    content: "2오늘의일기",
    img: "",
  },
  {
    id: 3,
    createdDate: new Date("2025-07-08").getTime(),
    emotionId: 3,
    content: "3오늘의일기",
    img: "",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    }
    case "DELETE": {
      return state.filter(
        (item) => String(item.id) !== String(action.targetId)
      );
    }
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mokData);
  const idRef = useRef(4);

  // 새로운 일기 추가
  const onCreate = ({ createdDate, emotionId, content, img }) => {
    //새로운 일기를 추가하는 기능

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
        img,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = ({ id, createdDate, emotionId, content, img }) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
        img,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = ({ targetId }) => {
    console.log("넘어옴?", targetId);
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
