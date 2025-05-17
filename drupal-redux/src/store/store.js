import { configureStore } from "@reduxjs/toolkit";
import { ArticleReduce } from "./articleSlice";
export const store = configureStore({
    reducer: {
        article: ArticleReduce
    }
})