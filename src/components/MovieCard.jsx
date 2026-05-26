import { TbStarFilled } from 'react-icons/tb'

function MovieCard({ posterSrc, name, voteAverage }) {

  return (
    <div className='w-full h-full border border-white/10 rounded-xl relative overflow-hidden cursor-pointer group animate-fadeIn transition duration-700 hover:scale-105 hover:border-white/25'>
        <img 
          src={posterSrc} 
          alt={`poster ${name}`}
          className='w-full h-full object-cover rounded-xl'
        />
        <div className='flex flex-col justify-end absolute gap-1 p-2 inset-0 bg-linear-to-t from-gray-800/95 via-gray-800/60 to-transparent opacity-0 transition duration-700 group-hover:opacity-100'>
            <span className='flex items-center gap-1 text-sm text-yellow-400'>
                <TbStarFilled size={18}/> {voteAverage}
            </span>
            <p className='text-white wrap-break-word opacity-0 group-hover:opacity-100'>
              {name}
            </p>
        </div>
    </div>
  )
}

export default MovieCard
