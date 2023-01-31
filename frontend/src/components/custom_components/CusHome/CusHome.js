import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function CusHome() {
  const navigate = useNavigate();
  const [avalBook, setAvalBook] = useState([]);
  const [unAvalBook, setUnAvalBook] = useState([]);
  const [borrow, setBorrow] = useState([]);

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const getBook = () => {
    fetch("http://localhost:8000/api/getBook", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => filterBook(result.data));
  };

  useEffect(() => {
    getBook();
  }, []);

  const filterBook = (value) => {
    const avalBooks = value.filter((i) => i.is_borrow == 1);
    const unAvalBooks = value.filter((i) => i.is_borrow == 0);
    setAvalBook(avalBooks);
    setUnAvalBook(unAvalBooks);
  };

  const borrowProcess = () => {
    fetch("http://localhost:8000/api/borrowProcess", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        books: borrow,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {
          getBook();
        } else if (result.status == "fail") {
          setErr(true);
          setErrMsg(result.message);
        }
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "type_name",
      headerName: "Type",
      width: 300,
    },
  ];

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ height: 650, width: "49%" }}>
          <div
            style={{
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div">
              Avaliable Books
            </Typography>
          </div>
          {err && (
            <Alert severity="warning" sx={{ mb: 4 }}>
              {errMsg}
            </Alert>
          )}
          <DataGrid
            rows={avalBook}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            sx={{
              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                {
                  display: "none",
                },
            }}
            onSelectionModelChange={(itm) => setBorrow(itm)}
            checkboxSelection
          />
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
                if (borrow.length > 5) {
                  setErr(true);
                  setErrMsg("Book limit reached!");
                } else if (borrow.length < 1) {
                  setErr(true);
                  setErrMsg("Select at least one book to borrow!");
                } else {
                  borrowProcess();
                }
              }}
            >
              Borrow Book
            </Button>
          </div>
        </div>
        <div style={{ height: 650, width: "49%" }}>
          <div
            style={{
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div">
              Borrowed Books
            </Typography>
          </div>
          <DataGrid
            rows={unAvalBook}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
          <div
            style={{
              height: 50,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginRight: 20,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
