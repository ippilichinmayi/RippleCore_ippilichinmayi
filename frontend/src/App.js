import { Routes, Route } from "react-router-dom";
import QRGenerator from "./QRGenerator";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<QRGenerator />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
