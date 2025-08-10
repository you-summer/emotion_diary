import { replace, useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext } from "../App";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  // const currentDiaryItem = getCurrentDiary();

  const curDiaryItem = useDiary(params.id);

  const onSubmit = async (input) => {
    const result = await Swal.fire({
      title: "정말 수정하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "rgb(100, 201, 100)",
      cancelButtonColor: "rgb(176, 176, 176)",
      confirmButtonText: "수정하기",
      cancelButtonText: "취소하기",
      showClass: { popup: "" }, // 애니메이션 제거
      hideClass: { popup: "" },
    });
    if (result.isConfirmed) {
      const resultIsConfirmed = await Swal.fire({
        title: "수정 완료!",
        text: "수정이 완료되었습니다",
        confirmButtonColor: "rgb(100, 201, 100)",
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });

      if (resultIsConfirmed.isConfirmed) {
        onUpdate({
          id: params.id,
          emotionId: input.emotionId,
          content: input.content,
          createdDate: input.createdDate.getTime(),
        });
        nav("/", { replace: true });
      }
    }
  };

  const onClickDelete = async () => {
    console.log("삭제클릭", params.id);

    //sweetAlert2 사용
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "rgb(253, 86, 95)",
      cancelButtonColor: "rgb(176, 176, 176)",
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소하기",
      showClass: { popup: "" }, // 애니메이션 제거
      hideClass: { popup: "" },
    });
    if (result.isConfirmed) {
      const confirmedResult = await Swal.fire({
        title: "삭제완료!",
        text: "일기가 삭제되었습니다",
        confirmButtonText: "확인",
        confirmButtonColor: "rgb(100, 201, 100)",
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });

      if (confirmedResult.isConfirmed) {
        onDelete({ targetId: params.id });
        nav(-1, { replace: true });
      }
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />

      <Editor onSubmitInput={onSubmit} initData={curDiaryItem} />
    </div>
  );
};
export default Edit;
