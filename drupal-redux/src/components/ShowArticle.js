import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticle, updateArticle } from "../store/articleSlice";
import { DeleteArticle } from "./DeleteArticle";
import { type } from "@testing-library/user-event/dist/type";

export const ShowArticle = () => {
    const dispatch = useDispatch();
    const [saveToggle, setSaveToggle] = useState(false);
    const articlestate = useSelector((state)=> state.article)
    const [isselect, setIsSelect] = useState()
    const [formdata, setFormData] = useState({
        title:"",
        body:"",
        nid: ""
    })
    useEffect(()=>{
        const articlefetch = async() =>{
            const response = await fetch("http://localhost/drupal/blog/path");
            const data = await response.json()
            dispatch(fetchArticle(data))
        }
        articlefetch() 
        
    },[dispatch, saveToggle])
    console.log(articlestate.articleList)

    const handleedit = (article) => {
        setIsSelect(article)
        setFormData({
            title:article.title,
            body:article.body,
            nid:article.nid
        })
    }
    const handlesubmit = async(event) =>{
        event.preventDefault()
        const id = formdata.nid;
        const username = "admin";
        const password = "admin";
        const link = `http://localhost/drupal/node/${id}/?_format=json`;
        const response = await fetch(link,{
            method:"PATCH",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization": "Basic" +btoa(`${username}:${password}`)
            },
            body:JSON.stringify({
                title:[{value:formdata.title}],
                body:[{value:formdata.body}],
                type:[{"target_id":"article"}]
            })
        })
        const update = await response.json()
        //console.log(update)
        dispatch(updateArticle(update))
        setSaveToggle(prev=> !prev)

    }
    const handleclose = () => {
        setIsSelect()
    }
    const handleonchange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formdata,
            [name]:value
        })

    }
    return (
        <>
                <div className="flex justify-center flex-wrap">
        {articlestate.articleList && articlestate.articleList.map(current=> (
        <div className="max-w-sm border rounded p-3 m-4" key={current.nid}>
            <img src={current?.field_image || ' '} alt="" />
            <h3 className="text-2xl my-5">
                {current.title}
                
            </h3>
            <p>{current.body}</p>
            <button  onClick={()=>handleedit(current)} type="button" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
            <DeleteArticle current={current}/>
        </div>
        ))}
        </div>
        {isselect && (
         



         <div id="crud-modal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
             <div class="relative p-4 w-full max-w-md max-h-full">
                
                 <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                     
                     <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                         <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                             Create New Product
                         </h3>
                         <button onClick={handleclose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                             <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                             </svg>
                             <span  class="sr-only">Close modal</span>
                         </button>
                     </div>
                     <form class="p-4 md:p-5" onSubmit={handlesubmit}>
                         <div class="grid gap-4 mb-4 grid-cols-2">
                             
                                 <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                 <input type="text" onChange={handleonchange} value={formdata.title} name="title" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                             
                             <label for="body" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
         <textarea name="body" onChange={handleonchange} rows="4" value={formdata.body} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                             
                         </div>
                         <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                             Update Article
                         </button>
                     </form>
                 </div>
             </div>
         </div> 
         
          )} 
        </>
    )
}