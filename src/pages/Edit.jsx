import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  // const params = useParams();
  const nav = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const onSubmit = (input) => {
    onUpdate({
      emotionId: input.emotionId,
      content: input.content,
      createdDate: input.createdDate,
    });
  };

  return (
    <div>
      <Header
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        title={"일기 수정하기"}
      />

      <Editor onSubmitInput={onSubmit} />
    </div>
  );
};
export default Edit;
