import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../register/register";
import Login from "../login/Login";
import NotFound from "../componets/NootFound";
import Profile from "../componets/profile/Profile";
import Admin from "../componets/profile/AdminDoshboard/AdminDoshboard";
import LessonTopic from "../componets/profile/AdminDoshboard/AdminLessons/LessonTopic";
import { getCookie } from "../Hooks/getCooce";
import DarsUser from "../componets/profile/lessons/lesson/DarsUser";
import Quiz from "../componets/Quiz/Quiz";
import QuizAdmin from "../componets/profile/AdminDoshboard/AdminLessons/QuizAmin";
import Certificate from "../componets/profile/AdminDoshboard/AdminLessons/Certificate";

// ProtectedRoute component for role-based access control
const ProtectedRoute = ({ children, allowedRoles, token, role }) => {
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return children;
};

function RootControl() {
  const token = getCookie("token");
  const role = getCookie("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* Asosiy sahifa */}
        <Route
          path="/"
          element={
            token && role === "user" ? (
              <Navigate to="/profile" />
            ) : token && role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Home />
            )
          }
        />

        {/* Kirish va ro‘yxatdan o‘tish sahifalari */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin sahifalari */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:nomi/"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["admin"]}>
              <LessonTopic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:nomi/:darsnomi"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["admin"]}>
              <LessonTopic />
            </ProtectedRoute>
          }
        />

        {/* Foydalanuvchi sahifalari */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:nomi"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["user"]}>
              <DarsUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:nomi/:dasrnomi"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["user"]}>
              <DarsUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:nomi/:dasrnomi/:quiz"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["user"]}>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:nomi/:dasrnomi/quizAmin"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["admin"]}>
              <QuizAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:nomi/certificate"
          element={
            <ProtectedRoute token={token} role={role} allowedRoles={["user"]}>
              <Certificate />
            </ProtectedRoute>
          }
        />

        {/* 404 sahifa */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootControl;
