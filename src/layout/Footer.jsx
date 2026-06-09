import LogoIcon from '../components/LogoIcon'

function Footer() {
  return (
      <footer className='bg-slate-900 border-t border-white/10'>
        <div className='grid grid-cols-2 py-5'>
          <div className='flex flex-col items-center gap-1'>
            <div className='flex items-center gap-3.5'>
              <LogoIcon/>
              <h2 className='text-white text-xl font-bold tracking-wide'>
                  Movie<span className='text-blue-400'>List.</span>
              </h2>
            </div>
            <p className='text-gray-400'>Explore e descubra filmes incríveis.</p>
          </div>

          <div className='flex flex-col items-center'>
            <h1 className='text-white font-medium text-xl'>Fonte</h1>
            <p className='text-gray-400'>Dados fornecidos por  
              <a href='https://developer.themoviedb.org/docs/getting-started' target='_blank' className='text-blue-400 font-medium'> TMDB</a>
            </p>
          </div>

        </div>
          <div className='bg-gray-400 h-px w-2/4 mx-auto'></div>
          <div className='flex flex-col items-center p-3'>
            <p className='text-gray-400'>&copy; 2026 MovieList | Desenvolvido por 
              <a href='https://github.com/eduardochikora' target='_blank' className='text-blue-400 font-medium'> Eduardo Chikora</a>
            </p>
            <p className='text-gray-400'>Todos os direitos reservados.</p>
          </div>
    </footer>
  )
}

export default Footer