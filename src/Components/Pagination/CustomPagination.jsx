import Pagination from "@mui/material/Pagination";
import React from "react";

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#0D7377",
          borderRadius: "20px",
          padding: "5px",
          color: "white",
        }}
      >
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="secondary"
          hidePrevButton
          hideNextButton
        />
      </div>
    </div>
  );
}
