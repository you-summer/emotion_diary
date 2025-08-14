import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

const useMonthData = () => {
  const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1,
      0,
      0,
      0
    ).getTime();

    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    return data.filter(
      (item) => beginTime <= item.createdDate && item.createdDate <= endTime
    );
  };

  const [pivotDate, setPivotDate] = useState(new Date());

  // 일기 data context
  const data = useContext(DiaryStateContext);

  // > 클릭시 month 증가
  const increaseDate = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  // < 클릭시 month 감소
  const decreaseDate = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  // 필터링된 월별
  const monthlyData = getMonthlyData(pivotDate, data);

  return { pivotDate, increaseDate, decreaseDate, monthlyData };
};

export default useMonthData;
