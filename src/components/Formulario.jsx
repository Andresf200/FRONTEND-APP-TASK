import { useState,useEffect } from "react"
import Alerta from "./Alerta";
import useTareas from "../hooks/useTareas";


const Formulario = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [check, setCheck] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [filesList, setFilesList] = useState([]);

    const [alerta, setAlerta] = useState({});

    const {guardarTarea}  = useTareas();

    
    const resetForm = () =>{
             setTitle('');
             setDescription('');
             setDate('');
             setCheckList([]);
             setFilesList([]);
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (check.trim() !== '') {
            setCheckList([...checkList, check]);
            setCheck('');
        } 
    }

    const handleAddFile = (e) => {
        const file = Array.from(e.target.files);
        setFilesList((prevFiles) => [...prevFiles,...file]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

         if([title, description,date].includes('')){
            setAlerta({
                msg:'Los campos title, descripcion, fecha inicio y hora inicio son obligatorios',
                error:true,
                type: 'frontend' 
            })
            return;
         }

         setAlerta({});
         guardarTarea({title,description,date,checkList,filesList});
         setAlerta({msg:"Guardado Correctamente", type:"frontend"});
         resetForm();
    }

    const {msg} = alerta;
  return (
    <>
    <h2 className='font-black text-3xl text-center'>Administrador de Tareas</h2>
    <p className="text-lg text-center mb-10">
        Añade a tus Tareas y {''}
        <span className="text-blue-600 font-bold"> Administralas</span>
    </p>

    <form onSubmit={handleSubmit}
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
    >

      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Titulo
            </label>
            <input
              type="text"
              name={title}
              id="title"
              placeholder="Ingresa un Titulo"
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-400 focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3">
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Descripcion
            </label>
            <textarea
              name={description}
              id="description"
              placeholder="Ingresa una descripcion"
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-400 focus:shadow-md"
            />
          </div>
        </div>
      </div> 
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3">
          <div className="mb-5">
            <label
              htmlFor="date"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              name={date}
              id="date"
              onChange={e => setDate(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-400 focus:shadow-md"
            />
          </div>
        </div>
      </div>

 
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-2/3">
            <div className="mb-5">
              <label
                htmlFor="check"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Listado de Notas
              </label>
              <input
                id="check"
                name="check"
                type="text"
                value={check}
                onChange={e => setCheck(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-400 focus:shadow-md"
              />
            </div>
         </div>

         <div className="w-full px-3 sm:w-1/3 pt-9"> 
            <div>
                <button
                    onClick={handleAddTask}
                    className=" w-full hover:shadow-form rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none "
                >
                    Agregar
                </button>
            </div>
         </div>
      </div>

      <div className="mx-auto grid grid-cols-2">
                {checkList.map((check, index) => (
                    <div key={index} id="task" className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
                        <div className="inline-flex items-center space-x-2"> 
                            <div className="text-slate-500">{check}</div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-500 hover:text-red-700 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>                      
                        </div>
                    </div>
                ))}
      </div>
    

      <div className="mb-8">
          <input type="file" name="file" id="file" className="sr-only" onChange={handleAddFile}/>
          <label
            htmlFor="file"
            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span
                className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
              >
                Browse
              </span>
            </div>
          </label>
        </div>

        
        {filesList.map((file, index) => (
        <div key={index} className="mb-5 rounded-md bg-gray-200 py-4 px-8">
            <div className="flex items-center justify-between">
                <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    {file.name}
                </span>
                <button className="text-[#07074D]">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                    />
                    <path
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                    />
                  </svg>
                </button>
          </div>
          </div>
        ))} 

        

    {/* Button */}

      <div>
        <button
          className=" w-full hover:shadow-form rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none "
        >
          Guardar
        </button>
      </div>

    </form>

    {msg && <Alerta alerta={alerta}/>}

    </>
  )
}

export default Formulario
