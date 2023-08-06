import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';


const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Login = () =>{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerta,setAlerta] = useState({});

  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email,password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
        type: 'frontend'
      }); 
      return;
    }
    
    if(!emailPattern.test(email)){
      setAlerta({msg: 'El Email no es valido.',error: true,type: 'frontend'});
      return;
    }

    setAlerta({});
   
    try {
      const {data} = await clienteAxios.post('/login',{email,password});
      localStorage.setItem('task_token',data.access_token);
      setAuth(data);
      navigate('/admin');
    } catch (error) { 
      if (error.response && error.response.data && error.response.data.errors) {
          setAlerta({msg: error.response.data.errors, error: true});
        } 
      return;
    }

  }

  const { msg } = alerta;
  return (
    <>
               <div>
                <h1 className="text-blue-600 font-black text-6xl">
                      Inicia, Organiza, Conquista:
                    <span className="text-black"> Tu App de Tareas</span>
                </h1>
            </div>
            <div className='mt-20  md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>


            {msg && <Alerta 
              alerta={alerta}
            />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                      <label className="uppercase text-gray-600 text-xl font-bold">
                          Email
                      </label>
                      <input
                          type="email" 
                          placeholder="Email de Registro"
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