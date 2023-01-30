import Navbar from "../components/Navbar";
import { TextField, Alert, Select, MenuItem, InputLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import supabase from "../config";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      navigate("/");
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [twitter, setTwitter] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
        },
        {
          data: {
            name: name,
            mobile: mobile,
            twitter: twitter,
            role: role,
            gender: gender,
          },
        }
      );
      if (role === "User") {
        await supabase
          .from("phq9")
          .insert([{ email: email, share_id: email + password }]);
      } else {
        await supabase.from("consultants").insert([
          {
            name: name,
            email: email,
            phone: mobile,
            rating: Math.floor(Math.random() * (5 - 3)) + 3,
          },
        ]);
      }
      if (error) {
        throw new Error(error.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className={"container-w-flex login"}>
        <h2>Register</h2>
        <p>Welcome to Mental Aarog!</p>
        <TextField
          value={name}
          onChange={(e) => [setName(e.target.value)]}
          required
          fullWidth
          type={"text"}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          value={mobile}
          onChange={(e) => [setMobile(e.target.value)]}
          required
          fullWidth
          type={"number"}
          id="outlined-basic"
          label="Mobile"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          required
          fullWidth
          type={"text"}
          id="outlined-basic"
          label="Twitter Username"
          variant="outlined"
        />
        <br />
        <br />
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          fullWidth
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
        <br />
        <br />
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          fullWidth
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value={"User"}>User</MenuItem>
          <MenuItem value={"Consultant"}>Consultant</MenuItem>
        </Select>
        <br />
        <br />
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type={"email"}
          required
          fullWidth
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
          required
          fullWidth
          type={"password"}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {error && <Alert severity="error">{error}</Alert>}
        <br />
        <LoadingButton
          loading={loading}
          fullWidth
          type="submit"
          className={loading ? "" : "primary-btn"}
          variant="contained"
        >
          Register
        </LoadingButton>
      </form>
    </>
  );
};

export default Register;
