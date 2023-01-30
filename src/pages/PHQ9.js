import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const PHQ9 = () => {
  return (
    <>
      <Navbar />
      <div className="container-w-flex phq9">
        <h2>PHQ-9</h2>
        <div className="phq9">
          <div className="card">
            <h3>What is PHQ - 9?</h3>
            <p>
              The Patient Health Questionnaire (PHQ) - 9 is the major depressive
              disorder (MDD) module of the full PHQ
            </p>
            <p>
              Used to provisionally diagnose depression and grade severity of
              symptoms in general medican and mental health settings.
            </p>
          </div>
          <div className="card">
            <h3>Before Starting PHQ - 9</h3>
            <p>
              Over the last two weeks, how often have you been bothered by any
              of the following problems?
            </p>
          </div>
          <br />
          <div className="flex-center">
            <Link className="no-links" to={"/phq9/test"}>
              <Button className="primary-btn" variant="contained">
                Start Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PHQ9;
