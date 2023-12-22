import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SingleBlog from "./Pages/SingleBlog";
import { AddBlog } from "./Pages/AddBlog";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/blog' element={<SingleBlog />}></Route>
      <Route path='/add_blog' element={<AddBlog />}></Route>
    </Routes>
  )
}
