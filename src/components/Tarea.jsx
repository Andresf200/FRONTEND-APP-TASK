import { useEffect, useState } from 'react';

const Tarea = ({tarea,eliminarTarea,setEdicionTarea,mostrarTarea}) => {
    const {id,title,description,state,date_start,date_end,checklist,checklist_completed} = tarea.attributes;

    const [tiempoRestante, setTiempoRestante] = useState('');
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState('');

    useEffect(() => {
        if (state === 'todo') {
          const ahora = new Date();
          const inicio = new Date(date_start);
          const tiempoFaltante = inicio - ahora;

          const dias = Math.floor(tiempoFaltante / (1000 * 60 * 60 * 24)) ;

          setTiempoRestante(`${dias} días`);
        } else if (state === 'completed') {
          const ahora = new Date();
          const final = new Date(date_end);
          const tiempoPasado = ahora - final;

          const dias = Math.floor(tiempoPasado / (1000 * 60 * 60 * 24));

          setTiempoTranscurrido(`${dias} días`);
        }
    }, [state, date_start, date_end]);

    let stateFormat;
    if(state == 'todo'){
        stateFormat = 'Por Hacer'
    }else if(state == 'progress'){
        stateFormat = 'En Progreso';
    }else if(state == 'completed'){
        stateFormat = 'Hecho';
    }

    const formaterFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX',{dateStyle: 'long'}).format(nuevaFecha);
    };
  return (
    <>
    <div className={`mx-auto shadow-lg rounded-xl w-72 md:w-80 p-4 relative overflow-hidden 
    ${state == 'completed' ? 'bg-gray-100' : 'bg-white'}`}>
        <a href="#" className="w-full h-full block">
            
            <div className="w-full">
                <p className="text-gray-800 text-2xl  mb-2 font-bold">
                    {title}
                </p>
                <p className="text-gray-800 text-xl font-medium mb-2 truncate h-22 overflow-hidden">
                    {description}
                </p>
                <div className='mb-2 flex justify-between'>
                    <p className="text-gray-400 text-xs font-medium ">
                        Fecha Inicio: <span className='text-gray-800'> {formaterFecha(date_start)}</span>
                    </p>
                    <p className="text-gray-400 text-xs font-medium ">
                        Fecha Fin: <span className='text-gray-800'>
                            {date_end != null ? date_end : " Tarea sin Terminar"}
                        </span>
                    </p>
                </div>
                <p className="text-gray-800 text-sm mb-4 font-medium ">
                    Estado: {stateFormat}
                </p>
                <p className="text-gray-800 text-sm mb-4 font-medium ">
                    {state === 'todo' && `Tiempo restante: ${tiempoRestante}`}
                    {state === 'completed' && `Tiempo transcurrido: ${tiempoTranscurrido}`}    
                </p>

            </div>
            <div className="flex items-center justify-between my-2">
                <p className="text-gray-300 text-sm">
                    {checklist_completed}/{checklist} tareas completadas
                </p>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full">
                <div className={`h-full text-center text-xs text-white bg-blue-600 rounded-full w-${checklist_completed}/${checklist}`}>
                </div>
            </div>
            <div className='inline-flex items-center rounded-md shadow-sm my-2 mx-auto '>
            <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={() => setEdicionTarea(id)}
            >
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  </span>
                  <span>-</span>
            </button>
            <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={() => mostrarTarea(id)}
            >
            <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>                      
                </span>
                <span>View</span>
            </button>
            <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200   font-medium px-4 py-2 inline-flex space-x-1 items-center">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            </span>
            <span>OK</span>
            </button>

            <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={() => eliminarTarea(id)}
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </span>
                  <span>-</span>
            </button>
            </div>
        </a>
    </div>  
    </>
  )
}

export default Tarea
