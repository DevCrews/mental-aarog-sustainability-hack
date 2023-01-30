import Navbar from "../components/Navbar";
import supabase from "../config";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-w-flex profile">
        {user && (
          <>
            <div className="flex-center">
              <img
                src={`https://avatars.dicebear.com/api/${user.user_metadata.gender.toLowerCase()}/${
                  user.user_metadata.name
                }.svg`}
                alt="profile"
              />
            </div>
            <div className="flex-center">
              <div className="dash-card dash-card-auto">
                <h2>{user.user_metadata.name}</h2>
                <p>📧 {user.email}</p>
                <p>📞 {user.user_metadata.mobile}</p>
                <p>🐦 @{user.user_metadata.twitter}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
