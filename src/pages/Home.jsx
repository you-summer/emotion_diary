import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import useMonthData from "../hooks/useMonthData";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  const { pivotDate, increaseDate, decreaseDate, monthlyData } = useMonthData();
  usePageTitle("my diary");
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={decreaseDate} />}
        rightChild={<Button text={">"} onClick={increaseDate} />}
      />

      <DiaryList data={monthlyData} />
    </div>
  );
};
export default Home;
