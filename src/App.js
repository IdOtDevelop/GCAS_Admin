import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashBoard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
