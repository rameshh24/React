import { useDispatch } from "react-redux";
import { deleteArticle } from "../store/articleSlice"



export const DeleteArticle = ({current}) =>{
const dispatch = useDispatch();
    const handledelete = async()=> {
        const id = current.nid;
        const username = "admin";
        const password = "admin";
        const link = `http://localhost/drupal/node/${id}/?_format=json`;
        const response = await fetch(link, {
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "Content-type":"application/json",
                "Authorization":"Basic " +btoa(`${username}:${password}`)
            }

        })
        if(response.ok) {
            dispatch(deleteArticle(id))
            console.log("Article Deleted successfully");
        }
    }
    return (
        <button onClick={()=> handledelete(current.nid)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    )
}