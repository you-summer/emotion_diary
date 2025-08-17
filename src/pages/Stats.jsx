import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ChartEmotion from "../components/ChartEmotion";
import useMonthData from "../hooks/useMonthData";
import usePageTitle from "../hooks/usePageTitle";

const Stats = () => {
  const nav = useNavigate();

  const { pivotDate, increaseDate, decreaseDate, monthlyData } = useMonthData();

  usePageTitle("통계");

  return (
    <div>
      <Header
        title={"통계"}
        leftChild={<Button text={"Home"} onClick={() => nav("/")} />}
      />
      <ChartEmotion
        monthlyData={monthlyData}
        decreaseDate={decreaseDate}
        increaseDate={increaseDate}
        pivotDate={pivotDate}
      />
    </div>
  );
};
export default Stats;
