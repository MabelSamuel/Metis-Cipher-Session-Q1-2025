import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import HowToVotePage from "./pages/HowToVotePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="register" element={<RegisterPage/>} />
          <Route path="how-to-vote" element={<HowToVotePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
