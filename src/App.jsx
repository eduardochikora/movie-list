import { useEffect, useState } from 'react'

import { TbPlayerPlayFilled, TbAlertCircle, TbChevronDown, TbChevronUp } from 'react-icons/tb'

import Footer from './layout/Footer'
import Header from './layout/Header'
import Loader from './components/Loader'
import LogoIcon from './components/LogoIcon'
import MovieCard from './components/MovieCard'

import { getMovies, getBannerMovie } from './services/movieService'

function App() {

  const [movieBanner, setMovieBanner] = useState(null)
  const [showAllMovies, setShowAllMovies] = useState(false)
  const [listMovies, setListMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadMovies = async () => {
    try {
      const [movies, newBanner] = await Promise.all([getMovies(), getBannerMovie()])

      setMovieBanner(newBanner)
      setListMovies(movies)
    }
    catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])


  if (loading) return <Loader/>

  return (
    <>
      <Header/>
      <main className='bg-gray-800'>
        <section>
          <div className='h-125 relative'>
            <img src={movieBanner.image} alt='filme' className='w-full h-full object-cover object-top'/>
            <div className='flex absolute inset-0 bg-linear-to-b from-gray-800/40 via-gray-800/70 to-gray-800'>
              <div className='flex flex-col items-start justify-center max-w-4xl px-15 gap-10'>
                <span className='bg-blue-400 text-white py-1.5 px-3.5 text-sm font-medium rounded-4xl'>
                  {movieBanner.voteCount >= 10000 ? 'POPULAR' : 'EM ALTA'}
                </span>
                <h1 className='text-4xl text-white font-bold leading-15'>{movieBanner.title}</h1>
                <div className='flex items-center gap-5'>
                  <span className='text-gray-300 font-medium text-xl'>{movieBanner.date}</span>
                  <div className='flex gap-2'>
                    {movieBanner.genres.map(genre => (
                      <span key={genre.id} className='bg-blue-200 text-blue-400 font-medium text-sm py-1.5 px-3.5 rounded-4xl'>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className='flex gap-3'>
                  <button className='flex items-center gap-1.5 py-3 px-8 bg-blue-400 text-white rounded-xl cursor-pointer transition duration-700 hover:bg-blue-500'>
                      <TbPlayerPlayFilled size={19}/> Assistir agora
                  </button>
                  <button className='flex items-center gap-1.5 py-3 px-4.5 bg-transparent text-white border border-gray-400 rounded-xl cursor-pointer transition duration-700 hover:bg-gray-700'>
                      <TbAlertCircle size={19}/> Mais informações 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='flex justify-center'>
          <div className='flex flex-col gap-5 mb-15'>
            <h1 className='text-white font-semibold text-2xl border-l-3 ml-1 border-blue-400 pl-2'>Filmes</h1>
            <div className='grid grid-cols-5 auto-rows-[250px] gap-8'>
                {showAllMovies ? 
                listMovies.map(movie =>
                    <MovieCard key={movie.id}
                      posterSrc={movie.poster}
                      name={movie.title}
                      voteAverage={movie.voteAverage}
                    />
                  ) :
                listMovies.slice(0, 10).map(movie =>
                    <MovieCard key={movie.id}
                      posterSrc={movie.poster}
                      name={movie.title}
                      voteAverage={movie.voteAverage}
                    />
                  )
                }
            </div>
            <button onClick={() => setShowAllMovies(!showAllMovies)} className='flex items-center self-center gap-1.5 py-2.5 px-3.5 bg-blue-400 text-white rounded-xl cursor-pointer transition duration-700 hover:bg-blue-500'>
              {showAllMovies ? 'Ver menos filmes' : 'Ver mais filmes'}
              {showAllMovies ? <TbChevronUp size={21}/> : <TbChevronDown size={21}/>}
            </button>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App
