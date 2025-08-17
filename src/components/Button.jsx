import { useContext } from "react";
import "./Button.css";
import { IsDarkContext } from "../App";

const Button = ({ text, onClick, type, fixed, updel, setting }) => {
  const { isDark } = useContext(IsDarkContext);

  return (
    <button
      className={`Button Button_${type} Button_${fixed} Button_${updel} Button_${setting} Button_${isDark}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
