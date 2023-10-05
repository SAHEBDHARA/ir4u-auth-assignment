import LoginForm from "./components/Login/Login"
import RegistrationForm from "./components/Registration/Registration"
import Home from "./components/Home/Home"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App
