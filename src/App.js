import { Route, Routes } from "react-router-dom";
import Blogs from "./Pages/Blogs";
import SingleBlog from "./Pages/SingleBlog";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Blogs />}></Route>
      <Route path='/blog' element={<SingleBlog />}></Route>
    </Routes>
  )
}
