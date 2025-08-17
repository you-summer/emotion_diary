import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  usePageTitle("새 일기 쓰기");

  const onSubmit = (input) => {
    onCreate({
      emotionId: input.emotionId,
      createdDate: input.createdDate.getTime(),
      content: input.content,
      img: input.img,
    });
    nav("/", { replace: true });
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
        title={"새 일기 쓰기"}
      />

      <Editor onSubmitInput={onSubmit} />
    </div>
  );
};
export default New;
