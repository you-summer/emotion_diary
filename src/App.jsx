import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { useReducer, useRef, createContext, useState, useEffect } from "react";
import Stats from "./pages/Stats";
import SideButton from "./components/SideButton";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "/edit" : 일기를 수정하는 Edit 페이지

// const mokData = [
//   {
//     id: 1,
//     createdDate: new Date("2025-08-08").getTime(),
//     emotionId: 1,
//     content: "1오늘의일기",
//     img: "",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2025-08-10").getTime(),
//     emotionId: 2,
//     content: "2오늘의일기",
//     img: "",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2025-07-08").getTime(),
//     emotionId: 3,
//     content: "3오늘의일기",
//     img: "",
//   },
// ];

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter(
        (item) => String(item.id) !== String(action.targetId)
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const IsDarkContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      return;
    }
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 다크모드
  const onClickDark = () => {
    setIsDark(!isDark);
    console.log(isDark);
  };

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

  useEffect(() => {
    if (isDark) {
      document.querySelector("body").classList.add("backGroundDark");
      document.getElementById("root").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("backGroundDark");
      document.getElementById("root").classList.remove("dark");
    }
  }, [isDark]);

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <IsDarkContext.Provider value={{ isDark, onClickDark }}>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <div className={`App ${isDark ? "dark" : ""}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
      <SideButton />
    </IsDarkContext.Provider>
  );
}

export default App;
