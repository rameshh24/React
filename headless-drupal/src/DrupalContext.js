import { type } from "@testing-library/user-event/dist/type";
import { createContext, useContext, useReducer, useState } from "react";
const initialstate = {
    ArticleList:[]
}
const articleReducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case "ADD":
            return {...state, ArticleList: payload.data}
        case "SHOW":
            return {...state, ArticleList: payload.data}
        case "REMOVE":
            return {...state, ArticleList: state.ArticleList.filter(data => data.nid !== action.payload)}
        case "UPDATE":
            return {...state, ArticleList:state.ArticleList.map(data=> {
                return data.nid === action.payload ? action.payload : data
            })}
        default:
            return state
    }
}
const ArticleContext = createContext(initialstate);
export const ArticleProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(articleReducer, initialstate)
    // const [url, setUrl] = useState("http://localhost/drupal/blog/path")
    const [successMessage, setSuccessMessage] = useState()
    
    const fetchArticle = async()=>{
        
        const response = await fetch("http://localhost/drupal/blog/path");
        const data = await response.json()
        dispatch({
            type:"SHOW",
            payload: {
                data:data
            }
        })
    }
    const deleteArticle = async(id) => {
        console.log(id)
        const link = `http://localhost/drupal/node/${id}/?_format=json`;
        const username = "admin";
        const password = "admin";
        const response  = await fetch(link, {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization": "Basic " +btoa(`${username}:${password}`)
            },
        });
        dispatch({
            type:"REMOVE",
            payload:id
        }) 
        if(response.ok) {
            console.log("Item Deleted")
        }
        else {
            console.log("Error!!!!!!!!!!!")
        }
    }
    const addArticle = async(data) => {
        const link = "http://localhost/drupal/node?_format=json";
        const response = await fetch(link, {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                title:[{value:data.title}],
                body: [{value: data.body}],
                type: [{"target_id":"article"}]
            })
        })
        dispatch({
            type:"POST",
            payload: {
                data:data
            }
        })
        if(response.ok) {
            setSuccessMessage("Add Article successfully")
            
        }
    }
    const updateArticle = async(data) => {
        //console.log(data.nid)
        const id = data.nid;
        const username = "admin";
        const password = "admin";
        const link = `http://localhost/drupal/node/${id}/?_format=json`;
        const response = await fetch(link, {
            method:"PATCH",
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                "Authorization": "Basic " +btoa(`${username}:${password}`)
            },
            body:JSON.stringify({
                title: [{value:data.title}],
                body: [{value:data.body}],
                type: [{"target_id":"article"}]
            })
        });
        dispatch({
            type:"UPDATE",
            payload: {
                id:id
            }
        })
        if(response.ok) {
            console.log("Update Successfully")
            fetchArticle()
        }
        else {
            console.log("Errror")
        }
    }
   const  value = {
        ArticleList: state.ArticleList,
        addArticle,
        successMessage,
        fetchArticle, 
        deleteArticle,
        updateArticle
        
    }
    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    )
}

export const useArticle = () => {
    const context = useContext(ArticleContext);
    return context
}