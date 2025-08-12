import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        title={"통계"}
        leftChild={<Button text={"Home"} onClick={() => nav("/")} />}
      />
    </div>
  );
};
export default Stats;
