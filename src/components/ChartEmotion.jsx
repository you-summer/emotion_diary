import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import Button from "./Button";
import "./ChartEmotion.css";
import { emotionList } from "../util/constans";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = emotionList.map((item) => {
  return item.emotionName;
});

const ChartEmotion = ({
  monthlyData,
  decreaseDate,
  increaseDate,
  pivotDate,
}) => {
  const emotionCount = emotionList.map((emotionId) => {
    return monthlyData.filter((item) => {
      return item.emotionId === emotionId.emotionId;
    }).length;
  });

  const options = {
    scales: {
      y: {
        suggestedMin: 0, // 기본 최소값
        suggestedMax: 10, // 기본 최대값, 필요하면 데이터에 따라 늘어날 수 있음
        ticks: { stepSize: 1 },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "감정",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: emotionCount,
      },
      {
        type: "bar",
        label: "감정",
        backgroundColor: "rgb(75, 192, 192)",
        data: emotionCount,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="ChartEmotion">
      <div className="chart_date_section">
        <div>
          {/* 클릭시 month 감소 */}
          <Button onClick={decreaseDate} text={"<"} setting={"setting"} />
        </div>
        <div>{`${pivotDate.getFullYear()}년 ${
          pivotDate.getMonth() + 1
        }월`}</div>
        <div>
          {/* 클릭시 month 증가 */}
          <Button onClick={increaseDate} text={">"} setting={"setting"} />
        </div>
      </div>
      <div className="chart_section">
        <Chart type="bar" data={data} options={options} />
      </div>
      <div className="chart_content">
        <span>{pivotDate.getMonth() + 1}</span>월은{" "}
        <span> {monthlyData.length}</span>개의 일기를 작성했습니다
      </div>
    </div>
  );
};

export default ChartEmotion;
