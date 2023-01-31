import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function AddBook() {
  const name = useRef();

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [BookType, setBookType] = useState();
  const [BookTypeId, setBookTypeId] = React.useState("");

  useEffect(() => {
    getBookType();
  }, []);

  const getBookType = () => {
    fetch("http://localhost:8000/api/getBookType", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => setBookType(result.data));
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    setBookTypeId(event.target.value);
  };

  return (
    <Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
      <Typography variant="h4" sx={{ my: 4 }}>
        Register
      </Typography>

      {err && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          {errMsg}
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          fetch("http://localhost:8000/api/storeBook", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name: name.current.value,
              book_type_id: BookTypeId,
            }),
          }).then((res) => {
            if (!res.ok) {
              setErr(true);
              setErrMsg("Something Went Wrong!");
            } else {
              navigate("/libHome", { state: "Register successful" });
            }
          });
        }}
      >
        <OutlinedInput
          placeholder="name"
          fullWidth
          sx={{ mb: 2 }}
          inputRef={name}
        />
        <Select
          value={BookTypeId}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {BookType &&
            BookType.map((val) => (
              <MenuItem key={val.id} value={val.id}>
                {val.name}
              </MenuItem>
            ))}
        </Select>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </Box>
  );
}
