import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./component/login"
import Profile from "./component/profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App