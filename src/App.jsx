import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ImageManager from "./pages/ImageManager";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Content from "./pages/Content";
import { auth } from "./firebaseConfig"; // importe o auth

// Exponha o auth no window para uso no console do navegador
window.auth = auth;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/images"
          element={
            <PrivateRoute>
              <ImageManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/content"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;