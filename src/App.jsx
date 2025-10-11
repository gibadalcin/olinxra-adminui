import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ErrorBoundary from "./components/ErrorBoundary";
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
        <Route path="/" element={
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        } />
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/images"
          element={
            <ErrorBoundary>
              <PrivateRoute>
                <ImageManager />
              </PrivateRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/register"
          element={
            <ErrorBoundary>
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/content"
          element={
            <ErrorBoundary>
              <PrivateRoute>
                <Content />
              </PrivateRoute>
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;