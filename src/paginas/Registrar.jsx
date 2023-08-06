import {useState} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Registrar = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta,setAlerta] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();



    if([name,email,password,repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios',error: true, type:'frontend'});
      return;
    }
    
    if(!emailPattern.test(email)){
      setAlerta({msg: 'El Email no es valido.',error: true,type: 'frontend'});
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({msg: 'Los Password no son iguales', error: true,type:'frontend'});
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true,type:"frontend"});
      return;
    }

    setAlerta({});

    try {
          await clienteAxios.post('/register',{name,email,password,"password_confirmation": repetirPassword});
        setAlerta({
            msg: 'Creado correctamente!!',
            error: false,
            type: 'frontend'
        }); 
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            setAlerta({msg: error.response.data.errors, error: true});
          } 
    }

    }

   const {msg}  = alerta;
  return (
    <>
            <div>
                <h1 className="text-blue-600 font-black text-6xl">
                    Regístrate, Organiza, Triunfa: {" "} 
                    <span className="text-black"> Tu App de Tareas</span>
                </h1>
            </div>
            <div className='mt-20  md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>


            {msg && <Alerta 
              alerta={alerta}
            />}

                <form 
                onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text" 
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email" 
                            placeholder="Tu Email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold">
                            Comfirmar Password
                        </label>
                        <input
                            type="password" 
                            placeholder="Confirmar Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                   <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-blue-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-blue-800 md:w-auto"
                   /> 
                </form>

                <nav className='mt-10 lg:flex lg:justify-end'>
                    <Link 
                    className='block text-center my-5 text-gray-500'
                     to="/">¿Ya tienes una cuenta?  Inicia Sesión
                     </Link>
                </nav>
            </div>
    </>
  )
}


export default Registrar;