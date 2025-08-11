import "./Button.css";

const Button = ({ text, onClick, type, fixed }) => {
  return (
    <button
      className={`Button Button_${type} Button_${fixed}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
