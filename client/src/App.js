import './stylesheets/theme.css'
import './stylesheets/alignments.css'
import './stylesheets/custom-components.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/login/login";
import Register from "./pages/common/register/register";
import "./index.css"
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home/home";
import Welcome from "./components/Home/Welcome";
import Quiz from './pages/admin/exams/Quiz';
import "./stylesheets/layout.css";
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/exam/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
