import { useEffect, useState } from 'react'

import { TbPlayerPlayFilled, TbAlertCircle, TbChevronDown, TbChevronUp } from 'react-icons/tb'

import Footer from './layout/Footer'
import Header from './layout/Header'
import ErrorMessage from './components/ErrorMessage'
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

    setLoading(true)
    setError(null)

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

  if (error) return <ErrorMessage message={error} onRetry={loadMovies}/>

  return (
    <>
      <Header/>
      <main className='bg-gray-800'>
        <section>
          <div className='h-150 relative'>
            <img src={movieBanner.image} alt={`Banner do filme ${movieBanner.name}`} className='w-full h-full object-cover object-top' />
            
            <div className='absolute inset-0 bg-linear-to-b from-gray-800/50 via-gray-800/90 to-gray-800'>

              <div className='flex flex-col items-start pl-16 pt-40 max-w-3xl gap-10'>
                <span className='bg-blue-400 text-white py-1.5 px-3.5 text-sm font-medium tracking-wide rounded-4xl shadow-md shadow-gray-800/60'>
                  {movieBanner.badge}
                </span>
                <h1 className='text-5xl text-white font-bold drop-shadow-lg leading-15'>{movieBanner.name}</h1>
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
                  <button className='flex items-center gap-1.5 py-3 px-8 bg-blue-400 text-white rounded-xl cursor-pointer shadow-lg shadow-blue-500/30 transition duration-700 hover:bg-blue-500'>
                    <TbPlayerPlayFilled size={19}/> Assistir agora
                  </button>
                  <button className='flex items-center gap-1.5 py-3 px-4.5 bg-transparent text-white border border-gray-400 rounded-xl cursor-pointer shadow-md shadow-gray-800/50 transition duration-700 hover:bg-gray-600'>
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
            <div className='grid grid-cols-5 auto-rows-[260px] gap-6 max-w-250'>
              {showAllMovies ?
                listMovies.map(movie =>
                  <MovieCard key={movie.id}
                    posterSrc={movie.poster}
                    name={movie.name}
                    voteAverage={movie.voteAverage}
                  />
                ) :
                listMovies.slice(0, 10).map(movie =>
                  <MovieCard key={movie.id}
                    posterSrc={movie.poster}
                    name={movie.name}
                    voteAverage={movie.voteAverage}
                  />
                )
              }
            </div>
            <button onClick={() => setShowAllMovies(!showAllMovies)} className='flex items-center self-center gap-1.5 py-2.5 px-3.5 bg-blue-400 text-white rounded-xl cursor-pointer shadow-lg shadow-blue-500/30 transition duration-700 hover:bg-blue-500'>
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
