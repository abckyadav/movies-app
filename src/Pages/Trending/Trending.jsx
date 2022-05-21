import axios from "axios";
import "./Trending.css";
import React, { useEffect, useState } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=2b7884b59c0c7b73ed53b87b99c88d53&page=${page}`
    );

    //console.log("data:", data.results);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((elem) => (
            <SingleContent
              key={elem.id}
              id={elem.id}
              poster={elem.poster_path}
              title={elem.title || elem.name}
              date={elem.first_air_date || elem.release_date}
              media_type={elem.media_type}
              vote_average={elem.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
