import axios from "axios";
import React, { useEffect, useState } from "react";
import Genres from "../../Components/Genres";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import useGenres from "../../hooks/useGenres";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=2b7884b59c0c7b73ed53b87b99c88d53&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    // &with_genres=${genreforURL}
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((elem) => (
            <SingleContent
              key={elem.id}
              id={elem.id}
              poster={elem.poster_path}
              title={elem.title || elem.name}
              date={elem.first_air_date || elem.release_date}
              media_type="tv"
              vote_average={elem.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Series;
