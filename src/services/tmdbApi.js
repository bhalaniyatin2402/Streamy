import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN
const headers = {
    Authorization: 'bearer ' + TMDB_TOKEN   
}

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.themoviedb.org/3/',
        headers,
    }),
    endpoints: (builder) => ({
        imageUrl: builder.query({
            query: () => '/configuration',
            transformResponse: (response) => {
                return response.images.secure_base_url + 'original'
            }
        }),
        genres: builder.query({
            query: () => `/genre/list`,
            transformResponse: (response) => {
                let genres = {}
                response.genres.map(g => {
                    genres[g.id]= g.name
                })
                return genres
            }   
        }),
        heroBannerBg: builder.query({
            query: () => '/movie/upcoming',
            transformResponse: response => {
                return response.results[Math.floor(Math.random() * 20)].backdrop_path
            }
        }),
        trending: builder.query({
            query: (endpoint) =>  `/trending/movie/${endpoint}`,
            transformResponse: response => {
                return response.results
            }
        }),
        popular: builder.query({
            query: (endpoint) => `/${endpoint}/popular`,
            transformResponse: response => {
                return response.results
            }
        }),
        topRated: builder.query({
            query: (endpoint) => `/${endpoint}/top_rated`,
            transformResponse: response => {
                return response.results
            }
        }),
        details: builder.query({
            query: ({mediaType, id}) => `/${mediaType}/${id}`
        }),
        videos: builder.query({
            query: ({mediaType, id}) => `/${mediaType}/${id}/videos`,
            transformResponse: response => {
                let videoList = []
                response.results.map((item, index) => {
                    videoList.push(index = { key: item.key, name: item.name})
                })
                return videoList
            }
        }),
        credits: builder.query({
            query: ({mediaType, id}) => `/${mediaType}/${id}/credits`,
            transformResponse: response => {
                let director = []
                let writer = []
                response.crew.filter(c => {
                    if(c.job === 'Screenplay' || c.job === 'Story' || c.job === 'Writer') {
                        writer.push(c.name)
                    }
                    if(c.job === 'Director') {
                        director.push(c.name)
                    }
                })
                return { cast: response.cast, director, writer }
            }
        }),
        similarMovies: builder.query({
            query: ({ mediaType, id}) => `/${mediaType}/${id}/similar`,
            transformResponse: response => {
                return response.results
            }
        }),
        recommendations: builder.query({
            query: ({ mediaType, id}) => `/${mediaType}/${id}/recommendations`,
            transformResponse: response => {
                return response.results
            }
        })
    }), 
})

export const {
    useImageUrlQuery, 
    useGenresQuery,
    useHeroBannerBgQuery,
    useTrendingQuery,
    usePopularQuery,
    useTopRatedQuery,
    useDetailsQuery,
    useVideosQuery,
    useCreditsQuery,
    useSimilarMoviesQuery,
    useRecommendationsQuery
} = tmdbApi

