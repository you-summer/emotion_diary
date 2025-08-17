import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./SideButton.css";
import { useContext, useEffect } from "react";
import { IsDarkContext } from "../App";

const SideButton = () => {
  const { isDark, onClickDark } = useContext(IsDarkContext);
  //   const = useContext(IsDarkContext);

  const nav = useNavigate();

  const onClickDarkMode = () => {
    onClickDark();
  };

  useEffect(() => {}, [isDark]);

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

        <Button
          text={`${isDark ? "☀️" : "🌙"}`}
          setting={"setting"}
          onClick={onClickDarkMode}
        />
      </div>
    </div>
  );
};
export default SideButton;
