import "./Button.css";

const Button = ({ text, onClick, type, fixed, updel, setting }) => {
  return (
    <button
      className={`Button Button_${type} Button_${fixed} Button_${updel} Button_${setting}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
