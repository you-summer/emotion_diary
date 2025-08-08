import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();

  return <div>{params.id}번 수정할 다이어리 입니다</div>;
};
export default Edit;
