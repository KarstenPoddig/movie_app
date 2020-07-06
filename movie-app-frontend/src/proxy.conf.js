const PROXY_CONFIG = [
  {
    context : [
      "/all_movies/movies_detail_data/",
      "/rated_movies/movies_detail_data/",
      "/all_movies/autocomplete/",
      "/rated_movies/autocomplete/",
      "/quality_of_profile/",
    ],
    target: "http://127.0.0.1:8000/movie_app/",
    secure: false
  },
  {
    context: [
      "/movies_detail_data/",
      "/hist_rating_data/",
      "/hist_rating_year_data/",
      "/hist_rating_genre_data/",
      "/avg_rating_genre_data/",
      "/clustered_movies/",
      "/refresh_cluster/",
    ],
    target: "http://127.0.0.1:8000/movie_app/rated_movies/",
    secure: false
  },
  {
    context: [
      "/similar_movies/",
      "/cluster/",
      "/actor/",
    ],
    target: "http://127.0.0.1:8000/movie_app/suggestions/",
    secure: false
  },
  {
    context: [
      "/api-token-auth/"
    ],
    target: "http://127.0.0.1:8000/",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

