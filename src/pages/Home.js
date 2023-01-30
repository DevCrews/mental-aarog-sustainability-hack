import UserDash from "../components/UserDash";
import supabase from "../config";
import { useState, useEffect } from "react";
import ConsultantDash from "../components/ConsultantDash";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return user && user.user_metadata.role === "User" ? (
    <UserDash />
  ) : (
    <ConsultantDash />
  );
};

export default Home;
