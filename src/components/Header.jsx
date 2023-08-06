import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth'

const Header = () => {
    const {cerrarSesion} = useAuth();
  return (
    <header className="py-10 bg-blue-600">
        <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-blue-200 text-center ">Organiza tu vida, tarea a {''} <span className="text-white"> Tarea.</span></h1>

            <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-0 items-center">
                <Link to="/admin" className="text-white text-sm font-bold uppercase"> 
                Administrar Tareas</Link>

                <button 
                type="button" 
                className="text-white text-sm font-bold uppercase"
                onClick={cerrarSesion} 
                > 
                Cerrar Sesión</button>
            </nav>
        </div>

    </header>
  )
}

export default Header
