import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () =>{
  return (
    <>
               <div>
                <h1 className="text-blue-600 font-black text-6xl">
                      Inicia, Organiza, Conquista:
                    <span className="text-black"> Tu App de Tareas</span>
                </h1>
            </div>
            <div className='mt-20  md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>


                <form >
                    <div className="my-5">
                      <label className="uppercase text-gray-600 text-xl font-bold">
                          Email
                      </label>
                      <input
                          type="email" 
                          placeholder="Email de Registro"
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      />
                    </div>
                    <div className="my-5">
                      <label className="uppercase text-gray-600 text-xl font-bold">
                          Password
                      </label>
                      <input
                          type="password" 
                          placeholder="Tu Password"
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      />
                    </div>
                   <input 
                    type="submit"
                    value="Iniciar Session"
                    className="bg-blue-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-blue-800 md:w-auto"
                   /> 
                </form>
                <nav className='mt-10 lg:flex lg:justify-end'>
                    <Link 
                    className='block text-center my-5 text-gray-500'
                     to="/registrar">¿No tienes una cuenta?  Regístrate
                     </Link>
                </nav>
            </div>
    </>
  )
}

export default Login