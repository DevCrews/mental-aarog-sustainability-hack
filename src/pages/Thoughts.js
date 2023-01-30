import Navbar from "../components/Navbar";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Thoughts = () => {
  const [d, setD] = useState();

  useEffect(() => {
    setD(localStorage.getItem("thoughts"));
  }, []);
  const [thought, setThought] = useState("");
  function add() {
    let data = localStorage.getItem("thoughts");

    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();

    let finalDate = cDay + "/" + cMonth + "/" + cYear;

    let time = currentDate.getHours() + ":" + currentDate.getMinutes();

    if (data === null) {
      data = thought + "(" + finalDate + "," + time + "++";
    } else {
      data = data + thought + "(" + finalDate + "," + time + "++";
    }
    localStorage.setItem("thoughts", data);
    setD(localStorage.getItem("thoughts"));
  }
  return (
    <>
      <Navbar />
      <div className="container-w-flex thoughts">
        <h2>Daily Routine</h2>
        <div className="button-holder">
          <TextField
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
            }}
            fullWidth
            id="outlined-basic"
            label="Add your schedule here"
          />
          <Button
            onClick={() => {
              add();
            }}
            variant="contained"
            className="primary-btn"
          >
            Add
          </Button>
        </div>
        {d &&
          d
            .split("++")
            .splice(0, JSON.stringify(d).split("++").length - 1)
            .map((thought, index) => {
              let t = thought.split("(")[0];
              return (
                <div key={index} className="dash-card dash-card-auto">
                  {t} <p>{thought.split("(")[1].split(",").join(" ")}</p>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Thoughts;
