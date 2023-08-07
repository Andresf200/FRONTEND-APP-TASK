
const Modal = ({modal,children}) => {
  return (
    <>
    {modal && (
      <div className="flex h-screen flex-col items-center justify-center space-y-6 bg-gray-100 px-4 sm:flex-row sm:space-x-6 sm:space-y-0 modal-overlay fixed inset-0 "> 

        <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-8 h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="my-4 text-center text-sm text-gray-500">Comfirma Si Deseas Eliminar La Tarea</p>
          <div className="space-x-4 bg-gray-100 py-4 text-center">
            {children }
          </div>
        </div>
      </div>   
        )}
    </>
  )
}

export default Modal

