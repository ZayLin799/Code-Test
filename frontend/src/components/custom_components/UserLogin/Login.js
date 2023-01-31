import React, { useRef, useState, useContext } from "react";
import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// import { AuthContext } from "../../AuthContext/AuthContext";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // const { getAuth } = useContext(AuthContext);

  return (
    <Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
      <Typography variant="h4" sx={{ my: 4 }}>
        Login
      </Typography>

      {location.state && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {location.state}
        </Alert>
      )}

      {err && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          {errMsg}
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          fetch("http://localhost:8000/api/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email.current.value,
              password: password.current.value,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.success == true) {
                console.log(result.data);
                localStorage.setItem(
                  "token",
                  result.data.token.original.access_token
                );
                localStorage.setItem("role", result.data.user.role_id);
                // getAuth(true);
                if (result.data.user.role_id == 1) {
                  navigate("/libHome");
                } else if (result.data.user.role_id == 2) {
                  navigate("/cusHome");
                }
              } else {
                setErr(true);
                setErrMsg("Something Went Wrong!");
              }
            });
        }}
      >
        <OutlinedInput
          placeholder="email"
          fullWidth
          sx={{ mb: 2 }}
          inputRef={email}
        />
        <OutlinedInput
          type="password"
          placeholder="password"
          fullWidth
          sx={{ mb: 2 }}
          inputRef={password}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Box>
  );
}
