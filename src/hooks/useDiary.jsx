import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      Swal.fire({
        title: "존재하지 않는 일기입니다",
        confirmButtonColor: "rgb(100, 201, 100)",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/", { replace: true });
        }
      });
    }
    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
};
export default useDiary;
