import { TbAlertTriangle, TbRotateClockwise } from 'react-icons/tb'

function ErrorMessage({ message, onRetry }) {
    return (
        <div className='flex h-dvh flex-col items-center justify-center gap-7 text-center bg-gray-800'>
            <div className='text-blue-400 text-2xl border border-blue-200 rounded-full p-3.5'>
                <TbAlertTriangle size={35}/>
            </div>

            <div className='flex flex-col gap-3'>
                <p className='text-white font-medium text-xl max-w-xs'>Não foi possível carregar os filmes</p>
                <p className='text-gray-400 text-md max-w-xs'>{message}</p>
            </div>

            <button onClick={onRetry} 
            className='flex items-center gap-1.5 py-3 px-4.5 border border-gray-400 rounded-xl text-gray-400 cursor-pointer transition duration-700 hover:bg-gray-600 hover:text-white'>
                <TbRotateClockwise size={19}/> Tentar novamente
            </button>
        </div>
    )
}

export default ErrorMessage