import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface Calculation {
  sign: string;
  number: number;
  result: number | string;
}

interface CalculatorContextProps {
  calculation: Calculation;
  setCalculation: Dispatch<SetStateAction<Calculation>>;
  history: (number | string)[];
  addToHistory: (entry: number | string) => void;
}

export const CalculatorContext = createContext<CalculatorContextProps | undefined>(undefined);

interface CalculatorProviderProps {
  children: ReactNode;
}

const CalculatorProvider = ({ children }: CalculatorProviderProps) => {
  const [calculation, setCalculation] = useState<Calculation>({
    sign: '',
    number: 0,
    result: 0,
  });

  const [history, setHistory] = useState<(number | string)[]>([]);

  const addToHistory = (entry: number | string) => {
    setHistory(prevHistory => [...prevHistory, entry]);
  };

  const providerValue: CalculatorContextProps = {
    calculation,
    setCalculation,
    history,
    addToHistory,
  };

  return (
    <CalculatorContext.Provider value={providerValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
