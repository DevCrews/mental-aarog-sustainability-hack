import Navbar from "../components/Navbar";
import { Alert, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import supabase from "../config/index";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      navigate("/");
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    await setLoading(false);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className={"container-w-flex login"}>
        <h2>Hello Again!</h2>
        <p>Welcome back to Mental Aarog!</p>
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          fullWidth
          type={"email"}
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth
          required
          type={"password"}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        {error && <Alert severity="error">{error}</Alert>}
        <br />
        <LoadingButton
          fullWidth
          type="submit"
          className={loading ? "" : "primary-btn"}
          variant="contained"
          loading={loading}
        >
          Login
        </LoadingButton>
      </form>
    </>
  );
};

export default Login;
