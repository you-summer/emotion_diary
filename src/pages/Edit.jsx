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
import useSweetAlertOnDelete from "../hooks/useSweetAlertOnDelete";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate } = useContext(DiaryDispatchContext);

  const onClickDelete = useSweetAlertOnDelete();

  const curDiaryItem = useDiary(params.id);

  usePageTitle(`${params.id}번 일기 수정`);

  const onSubmit = async (input) => {
    const result = await Swal.fire({
      title: "정말 수정하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "rgb(254, 223, 4)",
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
        confirmButtonColor: "rgb(254, 223, 4)",
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });

      if (resultIsConfirmed.isConfirmed) {
        onUpdate({
          id: params.id,
          emotionId: input.emotionId,
          content: input.content,
          createdDate: input.createdDate.getTime(),
          img: input.img,
        });
        nav("/", { replace: true });
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
          <Button
            text={"삭제하기"}
            type={"NEGATIVE"}
            onClick={() => onClickDelete(params.id)}
          />
        }
      />

      <Editor onSubmitInput={onSubmit} initData={curDiaryItem} />
    </div>
  );
};
export default Edit;
