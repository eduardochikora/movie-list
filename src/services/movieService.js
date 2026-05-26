const api_key = import.meta.env.VITE_MOVIE_API_KEY

// Busca os filmes da API do TMDB
const fetchMovies = async () => {

  try {
    const moviesRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=pt-BR`,
      { method: 'GET', headers: { accept: 'application/json' }}
    )
    
    if (!moviesRes.ok) {
      throw new Error(`Erro na requisição: ${moviesRes.status}`)
    }
      
    const moviesData = await moviesRes.json()

    return moviesData
  }
  catch (err) {
    throw new Error(`Não foi possível carregar os filmes (${err.message})`)
  }

}

// Pega os filmes e os retorna formatados em um objeto
export const getMovies = async () => {

  try {
    const movies = await fetchMovies()
    const genres = await fetchGenres()

    const formattedMovies = movies.results.map((movie) => ({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
      image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      title: movie.title,
      description: movie.overview,
      genres: getGenresMovies(movie.genre_ids, genres),
      date: movie.release_date.slice(0, 4),
      voteAverage: movie.vote_average.toFixed(1),
      voteCount: movie.vote_count
    }))

    return formattedMovies

  } catch (err) {
    throw new Error(`Não foi possível carregar os filmes (${err.message})`)
  }

}

export const getBannerMovie = async () => {

  try {
    const moviesInfo = await getMovies()
    
    const randomIndex = Math.floor(Math.random() * moviesInfo.length)

    const bannerMovie = {
      image: moviesInfo[randomIndex].image,
      title: moviesInfo[randomIndex].title,
      date: moviesInfo[randomIndex].date,
      genres: moviesInfo[randomIndex].genres,
      voteCount: moviesInfo[randomIndex].voteCount
    }

    return bannerMovie

  } catch (err) {
    throw new Error(`Não foi possível carregar os filmes (${err.message})`)
  }

}

// Busca a lista de gêneros de filmes da API
const fetchGenres = async () => {

  try {
    const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-BR`,
      { method: 'GET', headers: { accept: 'application/json' }}
    )

    if (!genresRes.ok) {
      throw new Error(`Erro na requisição: ${genresRes.status}`)
    }

    const genresData = await genresRes.json()
    return genresData.genres

  } catch (err) {
    throw new Error(`Não foi possível carregar os gêneros (${err.message})`)
  }

}
  
// Filtra os gêneros do filme pelo ID
const getGenresMovies = (genreIds, genres) => { 
    return genres.filter(genre => genreIds.includes(genre.id)).slice(0, 2)
}



/*const details = {
      id: result.id,
      poster: `https://image.tmdb.org/t/p/w342${result.poster_path}`,
      image: `https://image.tmdb.org/t/p/original${moviesNowPlayingData.results[randomMovie].backdrop_path}`,
      title: moviesNowPlayingData.results[randomMovie].title,
      description: releaseData.results[randomMovie].overview,
      genre: getGenresMovie(moviesNowPlayingData),
      date: moviesNowPlayingData.results[randomMovie].release_date.slice(0, 4),
      average: moviesNowPlayingData.results[randomMovie].vote_average.toFixed(1),
      note: result.vote_average.toFixed(1),
    }*/

/*export const getDetailsMovie = async () => {

    // Pegar filmes em cartaz
    const moviesNowPlayingData = await fetchMovies()

    // Detalhes do filme selecionado
    const detailsMovie = {
      image: `https://image.tmdb.org/t/p/original${moviesNowPlayingData.results[randomMovie].backdrop_path}`,
      title: moviesNowPlayingData.results[randomMovie].title,
      genre: getGenresMovie(moviesNowPlayingData),
      date: moviesNowPlayingData.results[randomMovie].release_date.slice(0, 4),
      average: moviesNowPlayingData.results[randomMovie].vote_average.toFixed(1),
      //description: releaseData.results[randomMovie].overview
    }
    
    return detailsMovie
   
}*/