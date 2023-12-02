// Screen.tsx
import { useContext } from "react";
import { CalculatorContext } from "../context/CalculatorProvider";
import { Textfit } from "react-textfit";

function Screen() {
  const { calculation, history } = useContext(CalculatorContext)!;

  return (
    <div className="calculator-container">
      <div className="history-container">
        <div className="history">
          {history.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
      </div>

      <div className="screen-container">
        <Textfit className="screen" max={70} mode="single">
          {calculation.number
            ? calculation.number
            : calculation.sign !== ""
            ? calculation.sign
            : calculation.result}
        </Textfit>
      </div>
    </div>
  );
}

export default Screen;
