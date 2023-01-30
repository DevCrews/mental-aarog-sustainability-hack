import Navbar from "./Navbar";
import dashLinks from "../data/dashlink";
import DashCard from "./DashCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config";
import Popup from "reactjs-popup";

const UserDash = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  useEffect(() => {
    async function fetchData() {
      const d = await fetch(
        "https://api.pexels.com/v1/search?query=motivational quotes&per_page=100",
        {
          headers: {
            AUTHORIZATION: process.env.REACT_APP_PEXELS,
          },
        }
      );
      const pd = await d.json();
      await setSrc(pd.photos[Math.floor(Math.random() * 100)].src.large);
    }
    fetchData();
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    } else {
      setUser(user);
    }
  }, [navigate]);

  return (
    <>
      {src && (
        <Popup open={true} modal>
          {(close) => (
            <div>
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="content">
                <img src={src} alt="motivational-quote" />
              </div>
            </div>
          )}
        </Popup>
      )}

      <Navbar />
      <div className="container dashboard">
        {user && (
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>
            Welcome, {user.user_metadata.name}!
          </p>
        )}
        <div className="card-container">
          {dashLinks.map((dashLink, index) => (
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
