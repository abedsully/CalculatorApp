import CalculatorProvider from "../context/CalculatorProvider";
import Wrapper from "../components/Wrapper";
import Screen from "../components/Screen";
import ButtonBox from "../components/ButtonBox";
import Button from "../components/Button";

const buttonValues: (number | string)[][] = [
  ["C", "DEL", "?", "/"],
  [1, 2, 3, "X"],
  [4, 5, 6, "-"],
  [7, 8, 9, "+"],
  [0, "="],
];

const CalculatorPage = () => (
  <CalculatorProvider>
    <h1>Simple Calculator</h1>
    <Wrapper>
      <Screen />
      <ButtonBox>
        {buttonValues.flat().map((button, index) => (
          <Button value={button} key={index} />
        ))}
      </ButtonBox>
    </Wrapper>
  </CalculatorProvider>
);

export default CalculatorPage;
