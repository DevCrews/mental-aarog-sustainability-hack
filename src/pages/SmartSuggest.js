import Navbar from "../components/Navbar";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SmartSuggest = () => {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState("");
  const handleSelection = () => {
    navigate(`/smart-suggest/${suggestion}`);
  };

  return (
    <>
      <Navbar />
      <div className="container-w-flex">
        <h2>Smart Suggestion</h2>
        <p>What makes you feel happy when you are down?</p>
        <FormControl fullWidth>
          <InputLabel id="select-label">Select an Option*</InputLabel>
          <Select
            labelId="select-label"
            value={suggestion}
            label="Select an Option*"
            onChange={(e) => {
              setSuggestion(e.target.value);
            }}
          >
            <MenuItem value={"music"}>Music</MenuItem>
            <MenuItem value={"food"}>Food</MenuItem>
            <MenuItem value={"travel"}>Travel</MenuItem>
            <MenuItem value={"reading"}>Reading</MenuItem>
            <MenuItem value={"movies"}>Movies</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          onClick={() => {
            handleSelection();
          }}
          fullWidth
          variant="contained"
          className="primary-btn"
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default SmartSuggest;
