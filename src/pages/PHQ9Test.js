import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import questions from "../data/phq9";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
const PHQ9Test = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(0);
  let marks = 0;
  return (
    <>
      <Navbar />
      <div className="container-w-flex phq9">
        <h2>Question {index + 1}</h2>
        <div className="test">
          <p className="ques">{questions[index].q}</p>
          <FormControl>
            <FormLabel id="group-label">Select your answer</FormLabel>
            <RadioGroup
              aria-labelledby="group-label"
              defaultValue="Not at all"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Not at all"
                name="choice"
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Several days"
                name="choice"
              />
              <FormControlLabel
                onChange={(e) => {
                  marks = Number(e.target.value);
                }}
                value="2"
                control={<Radio />}
                label="More than half the days"
                name="choice"
              />
              <FormControlLabel
                name="choice"
                value="3"
                control={<Radio />}
                label="Nearly every day"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Button
          onClick={() => {
            marks = Number(
              document.querySelector("input[name=choice]:checked").value
            );
            if (index < 8) {
              setIndex((i) => i + 1);
              setResult((r) => r + marks);
            } else {
              localStorage.setItem("result", JSON.stringify(result + marks));
              navigate("/phq9/test/result");
            }
          }}
          className="primary-btn"
          variant="contained"
        >
          {index < 8 ? "Next" : "Finish"}
        </Button>
      </div>
    </>
  );
};

export default PHQ9Test;
