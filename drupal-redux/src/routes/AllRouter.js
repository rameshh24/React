import { Routes, Route } from "react-router-dom"
import { ShowArticle } from "../components/ShowArticle"
import { AddArticle } from "../components/AddArticle"
export const AllRouter = () => {
    return (
        <Routes>
            <Route path="/show-article" element={<ShowArticle/>}/>
            <Route path="/add-article" element={<AddArticle/>} />
        </Routes>
    )
}