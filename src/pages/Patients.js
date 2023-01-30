import Navbar from "../components/Navbar";
import supabase from "../config";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const Patients = () => {
  const [data, setData] = useState();
  const user = supabase.auth.user();
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("consulting_data")
        .select()
        .match({ consultant_email: user.email });
      await setData(data);
    }
    fetchData();
  }, [user.email]);
  return (
    <>
      <Navbar />
      <div className="container-w-flex patients">
        <h2>Your Patients</h2>
        {!data && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        {data &&
          data.map((data, index) => (
            <div key={index} className="dash-card dash-card-auto ">
              <p>
                <span>Patient name : </span>
                {data.patient_name}
              </p>
              <p>
                <span>Patient mobile : </span> {data.patient_mobile}
              </p>
              <p>
                <span>Patient email : </span> {data.patient_email}
              </p>
              <p>
                <span>Patient's Current Situation :</span> <br />
                <br /> {data.patient_situation}
              </p>
              <Button variant="contained" className="secondary-btn">
                <a
                  className="no-links"
                  href={`https://wa.me/+91${data.patient_mobile}`}
                >
                  Connect
                </a>
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Patients;
