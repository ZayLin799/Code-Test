import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirm_password = useRef();

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

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

          fetch("http://localhost:8000/api/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.current.value,
              email: email.current.value,
              password: password.current.value,
              password_confirmation: confirm_password.current.value,
              role_id: 2,
            }),
          }).then((res) => {
            if (!res.ok) {
              setErr(true);
              setErrMsg("Something Went Wrong!");
            } else {
              navigate("/", { state: "Register successful" });
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
        <OutlinedInput
          type="password"
          placeholder="Confirm password"
          fullWidth
          sx={{ mb: 2 }}
          inputRef={confirm_password}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </Box>
  );
}
