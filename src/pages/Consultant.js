import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import supabase from "../config";
import { Rating, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Consultant = () => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("consultants").select();
      await setData(data);
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container-w-flex consultants">
        <h2>Consultants</h2>
        {!data && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        {data &&
          data.map((data) => (
            <div key={data.id} className="dash-card dash-card-auto ">
              {data.name} <br /> {data.email}
              <Rating name="read-only" value={Number(data.rating)} readOnly />
              <Button
                onClick={() => {
                  navigate(`/consultation/${data.email}`);
                }}
                variant="outlined"
                className="secondary-btn"
              >
                Consult
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Consultant;
