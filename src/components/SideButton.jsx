import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./SideButton.css";

const SideButton = () => {
  const nav = useNavigate();

  return (
    <div className="SideButton">
      <div className="side_button">
        <Button
          text={"📊"}
          setting={"setting"}
          onClick={() => {
            nav(`/stats`);
          }}
        />
        <Button text={"🌙"} setting={"setting"} />
      </div>
    </div>
  );
};
export default SideButton;
