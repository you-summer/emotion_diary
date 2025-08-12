import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DiaryDispatchContext } from "../App.jsx";
import { useContext } from "react";

const useSweetAlertOnDelete = () => {
  const nav = useNavigate();
  const { onDelete } = useContext(DiaryDispatchContext);

  const onClickDelete = async (id) => {
    console.log("삭제클릭", id);

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
        confirmButtonColor: "rgb(254, 223, 4)",
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });

      if (confirmedResult.isConfirmed) {
        onDelete({ targetId: id });
        nav("/", { replace: true });
      }
    }
  };
  return onClickDelete;
};
export default useSweetAlertOnDelete;
