import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CalculatorContext } from "../context/CalculatorProvider";

interface ButtonProps {
  value: string | number;
}

const useHelpOperation = () => {
  const navigate = useNavigate();

  const helpOperation = () => {
    navigate("/support-page");
  };

  return helpOperation;
};

const styling = (name: string | number) => {
  const className: Record<string | number, string> = {
    "?": "support",
    "/": "operator",
    "X": "operator",
    "-": "operator",
    "+": "operator",
    "=": "equals",
    0: "zero",
  };

  return className[name];
};

const Button: React.FunctionComponent<ButtonProps> = ({ value }) => {
    const { calculation, setCalculation, addToHistory } = useContext(CalculatorContext)!;
  const helpOperation = useHelpOperation();

  // Delete Operation
  const delOperation = () => {
    const currentNumberString = calculation.number.toString();
    const updatedNumber =
      currentNumberString.length > 1 ? currentNumberString.slice(0, -1) : 0;
    const updatedSign = calculation.number === 0 ? "" : calculation.sign;

    setCalculation({
      ...calculation,
      number: Number(updatedNumber),
      sign: updatedSign,
    });
  };

  // Reset Operation
  const resetOperation = () => {
    setCalculation({
      sign: "",
      number: 0,
      result: 0,
    });
  };

  // Number Operation
  const handleClickNumber = () => {
    const numberString = value.toString();

    let numberValue;

    if (numberString === "0" && calculation.number === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calculation.number + numberString);
    }

    setCalculation({
      ...calculation,
      number: Number(numberValue),
    });
  };

  // Operator Operation
  const operatorOperation = () => {
    setCalculation({
      sign: value as string,
      result:
        !calculation.result && calculation.number
          ? calculation.number
          : calculation.result,
      number: 0,
    });
  };

  // Equal Operation
  const equalOperation = () => {
    if (
      calculation.result !== null &&
      calculation.number !== null &&
      calculation.sign !== ""
    ) {
      const MathOperations: Record<string, (a: number, b: number) => number> = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "X": (a, b) => a * b,
        "/": (a, b) => a / b,
      };

      const newResult = MathOperations[calculation.sign](
        Number(calculation.result),
        calculation.number
      );

      const finalResult = Number.isFinite(newResult) ? Number(newResult) : "Err";

      setCalculation({
        result: finalResult,
        sign: "",
        number: 0,
      });

      addToHistory(finalResult);
    }
  };

  const handleClick = () => {
    const results: Record<string | number, () => void> = {
      "DEL": delOperation,
      "C": resetOperation,
      "/": operatorOperation,
      "X": operatorOperation,
      "+": operatorOperation,
      "-": operatorOperation,
      "=": equalOperation,
      "?": helpOperation,
    };

    if (results[value]) {
      return results[value]();
    } else {
      return handleClickNumber();
    }
  };

  return (
    <button className={`${styling(value)} button`} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
