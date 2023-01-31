import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function LibHome() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [bookType, setBookType] = useState([]);

  const getBook = () => {
    fetch("http://localhost:8000/api/getBook", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => setBook(result.data));
  };

  useEffect(() => {
    getBook();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "name", headerName: "Name", width: 400 },
    {
      field: "type_name",
      headerName: "Type",
      width: 400,
    },
  ];

  return (
    <div>
      <div
        style={{
          height: 50,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginRight: 20,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            navigate("/addBook");
          }}
        >
          Add New Book
        </Button>
      </div>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={book}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}
