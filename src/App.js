import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" Component={HomePage} />
      <Route exact path="/login" Component={LoginPage} />
      <Route exact path="/register" Component={RegisterPage} />
      <Route exact path="/admin" Component={AdminPage} />
    </Routes>
  );
}

export default App;
