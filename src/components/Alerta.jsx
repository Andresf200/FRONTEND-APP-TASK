const Alerta = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-blue-400 to-blue-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm  mb-10`}>
        
          { (alerta.type == 'frontend')?
          alerta.msg
         : 
          Object.keys(alerta.msg).map((field) => (
                <div key={field}>{alerta.msg[field][0]}</div>
          ))}
      </div>
    )
  }
  
  export default Alerta;
  