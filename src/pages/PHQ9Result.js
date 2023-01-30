import Navbar from "../components/Navbar";
import { Button, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useState } from "react";
import supabase from "../config";

const PHQ9Result = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const result = Number(localStorage.getItem("result"));
  const resultStr =
    result >= 0 && result <= 4
      ? "Not at all 😀"
      : result >= 5 && result <= 9
      ? "Mild depression 🙂"
      : result >= 10 && result <= 14
      ? "moderate depression 😐"
      : result >= 15 && result <= 19
      ? "Moderately severe depression 😔"
      : "Severe depression 😭";

  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  let finalDate = cDay + "/" + cMonth + "/" + cYear;
  let time = currentDate.getHours() + ":" + currentDate.getMinutes();

  const saveData = async () => {
    setLoading(true);

    const user = await supabase.auth.user();
    const { data } = await supabase
      .from("phq9")
      .select()
      .match({ email: user.email });

    const oldD = await data[0]["phqdata"];
    const d = {
      date: finalDate,
      time: time,
      result: resultStr,
    };
    let stringified = "";
    if (oldD === null) {
      const dArray = [];
      dArray.push(d);
      stringified = JSON.stringify(dArray);
    } else {
      const pd = JSON.parse(data[0]["phqdata"]);
      pd.push(d);
      stringified = JSON.stringify(pd);
    }
    await supabase
      .from("phq9")
      .update({ phqdata: stringified })
      .match({ email: user.email });

    await setLoading(false);
    await setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-w-flex result">
        <h2>Result</h2>
        <div className="dash-card dash-card-auto">{resultStr}</div>
        <div className="dash-card dash-card-auto">
          {result >= 0 && result <= 4
            ? "You don't have depression. Stay the same, live your life in the way you like it!, Be Happy."
            : "Fight your depression! The key to navigating depression is to be open, accepting, and loving toward yourself and what you’re going through."}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={"/phq9/test"}>
            <Button className="primary-btn" variant="contained">
              Restart Quiz
            </Button>
          </Link>
          <LoadingButton
            onClick={() => {
              saveData();
            }}
            type="submit"
            className={loading ? "" : "primary-btn"}
            variant="contained"
            loading={loading}
          >
            Save Results
          </LoadingButton>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully Saved Test Data
        </Alert>
      </Snackbar>
    </>
  );
};

export default PHQ9Result;
