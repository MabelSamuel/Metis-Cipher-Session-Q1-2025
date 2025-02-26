import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
