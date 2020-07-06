select m.title

  from public.movie_app_movie m
       ,public.movie_app_rating r

 where r.user_id =  -- USER-ID
   and lower(m.title) like -- TERM
   and m."movieId" = r.movie_id

 order by m."nrRatings" desc

 limit 10