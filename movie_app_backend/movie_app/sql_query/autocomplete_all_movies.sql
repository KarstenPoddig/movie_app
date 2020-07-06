select m.title

  from public.movie_app_movie m

 where lower(m.title) like -- TERM

 order by m."nrRatings" desc

 limit 10