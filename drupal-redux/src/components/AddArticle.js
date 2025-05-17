import { useState } from "react"
import { addArticle, fetchArticle } from "../store/articleSlice"
import { useDispatch } from "react-redux"
export const AddArticle = () =>{
    const dispatch = useDispatch()
    const [successMessage, setSuccessMessage] = useState()
    const [data, setData] = useState({
        title:"",
        body:"",
        nid:""
    })
    const handlesubmit = async(event) => {
        
        event.preventDefault();
        const username = "admin";
        const password ="admin";
        const link = "http://localhost/drupal/node?_format=json";
        const response = await fetch(link, {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":"Basic " +btoa(`${username}:${password}`)
            },
            body: JSON.stringify({
                title:[{value:data.title}],
                body:[{value:data.body}],
                type:[{"target_id":"article"}]
            })
        })
        const dt = await response.json();
        dispatch(addArticle(dt))
        if(response.ok){
        dispatch(fetchArticle())
        setSuccessMessage("Add Article successfully")
        console.log("Artical Added!!!");
    }
    }
    const handleonchange = (event)=>{
        const {name, value} = event.target;
        setData({
            ...data, 
            [name]:value
        })
    }
    return (
        <div className="max-w-sm m-auto">
            { successMessage && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
          )
            }
        <form onSubmit={handlesubmit}>
            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Enter the title</label>
            <input name="title" onChange={handleonchange} className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <label htmlFor="body" className="block text-sm/6 font-medium text-gray-900">Enter Description</label>
            <textarea onChange={handleonchange} name="body" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            <button type="submit" className="my-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
        </form>
        </div>
    )
}