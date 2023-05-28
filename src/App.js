import {HashRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashBoard'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
