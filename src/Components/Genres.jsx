import Chip from "@mui/material/Chip";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=2b7884b59c0c7b73ed53b87b99c88d53&language=en-US`
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    // return () => {
    //   setGenres({});
    // };
  }, []);

  console.log("genres:", genres);
  return (
    <div style={{ padding: "6px  0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            color="success"
            label={genre.name}
            key={genre.id}
            size="small"
            style={{ margin: "2px" }}
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            color="secondary"
            label={genre.name}
            key={genre.id}
            size="small"
            style={{ margin: "2px" }}
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
