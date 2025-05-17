import { createSlice } from "@reduxjs/toolkit";
const ArticleSlice = createSlice({
    name:"article",
    initialState:{
        articleList:[]
    },
    reducers:{
        fetchArticle(state, action){
            state.articleList = action.payload
        },
        addArticle(state, action) {
            state.articleList.push(action.payload)
        },
        updateArticle(state, action) {
            const updateArticle = state.articleList.map(data=> 
                data.nid === action.payload.id ? action.payload : data

            );
            return {...state, articleList:updateArticle}
        },
        deleteArticle(state, action){
            const updateArticle = state.articleList.filter(data=> data.nid !== action.payload)
            return {...state, articleList:updateArticle}
        }

    }

})

export const {fetchArticle, addArticle, updateArticle, deleteArticle} = ArticleSlice.actions;
export const ArticleReduce = ArticleSlice.reducer;