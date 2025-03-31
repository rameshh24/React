import { Routes, Route } from "react-router-dom"
import { ShowArticle } from "../components/ShowArticle"
import { AddArticle } from "../components/AddArticle"
import { Home } from "../components/Home"
export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/show-article" element={<ShowArticle/>} />
            <Route path="/add-article" element={<AddArticle />} />
        </Routes>
    )
}