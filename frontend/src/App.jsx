import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <Box minH ={"100vh"}>
      <Navbar />
      <Routes>
        <Route path ='/login' element ={<LoginPage />} />
        <Route path ='/create' element ={<CreatePage />} />
        <Route path ='/' element ={<HomePage />} />
        <Route path ='/register' element ={<RegisterPage />} />
      </Routes>
    </Box>
  );
}

export default App
