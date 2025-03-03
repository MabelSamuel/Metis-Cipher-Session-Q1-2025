import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="register" element={<RegisterPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
