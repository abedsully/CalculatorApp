import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CalculatorPage from "./pages/CalculatorPage";
import SupportPage from "./pages/SupportPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CalculatorPage />} />
      <Route path="/support-page" element={<SupportPage />} />
    </Routes>
  </Router>
);

export default App;
