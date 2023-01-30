import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import supabase from "../config";

const TwitterAnalysis = () => {
  const user = supabase.auth.user();
  const [data, setData] = useState();
  useEffect(() => {
    setTimeout(() => {
      setData("Hello");
    }, 1000);
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="container-w-flex twitter">
        <h2>Twitter Analysis</h2>
        {!data && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        {data && (
          <div>
            <div className="dash-card dash-card-auto ">
              <h3>Result</h3>
              <h2>Positive</h2>
            </div>
            <div className="dash-card dash-card-auto ">
              <h3>Tips</h3>
              You do not have depression stay the same and live a happy life
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TwitterAnalysis;
