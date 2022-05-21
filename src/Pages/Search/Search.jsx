import { Button, Tab, Tabs, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=2b7884b59c0c7b73ed53b87b99c88d53&language=en-US&query=${searchText}&page=${page}&include_adult=true`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <div>
        <TextField
          style={{ flex: 1, backgroundColor: "white" }}
          className="searchBox"
          label="Search"
          varient="standard"
          size="small"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button
          onClick={fetchSearch}
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10, padding: "9px" }}
        >
          <SearchIcon />
        </Button>
      </div>

      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="secondary"
        style={{ paddingBottom: 5 }}
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
      >
        <Tab style={{ width: "50%", color: "white" }} label="Search Movies" />
        <Tab
          style={{ width: "50%", color: "white" }}
          label="Search TV Series"
        />
      </Tabs>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          content.length < 1 &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
