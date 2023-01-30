import Navbar from "./Navbar";
import consultantdashlinks from "../data/consultantdashlinks";
import DashCard from "./DashCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config";

const UserDash = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    } else {
      setUser(user);
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container dashboard">
        {user && (
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>
            Welcome, {user.user_metadata.name}!
          </p>
        )}
        <div className="card-container">
          {consultantdashlinks.map((dashLink, index) => (
            <DashCard
              key={index}
              name={dashLink.name}
              link={dashLink.link}
              img={dashLink.img}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserDash;
