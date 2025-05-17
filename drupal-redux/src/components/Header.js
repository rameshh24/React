import { Link } from "react-router-dom"
import Logo from "../assets/logo.svg"
export const Header = () =>{
    return (
        <div className="max-w-7xl m-auto">
            <header className="border-b">
                <div className="flex justify-between flex-wrap items-center py-2 mx-2">
                    <div className="logo">
                        <img src={Logo} />
                    </div>
                    <nav>
                        <Link to="/show-article" className="p-3 text-lg hover:bg-gray-100 hover:cursor-pointer rounded">Show Article</Link>
                        <Link to="/add-article" className="p-3 text-lg hover:bg-gray-100 hover:cursor-pointer rounded">Add Article</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}