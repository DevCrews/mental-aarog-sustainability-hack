import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { TextField, Alert, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import supabase from "../config";

const ConsultingDetails = ({ location }) => {
  const [consultantEmail, setConsultantEmail] = useState();
  useEffect(() => {
    setConsultantEmail(window.location.href.split("/")[4]);
  }, []);
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [situation, setSituation] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(location);

  const handleClose = (event, reason) => {
    setOpen(false);
    if (reason === "clickaway") {
      return;
    }
  };
  const submitData = async () => {
    setLoading(true);
    const user = supabase.auth.user();
    await supabase.from("consulting_data").insert([
      {
        consultant_email: consultantEmail,
        patient_email: user.email,
        patient_name: name,
        patient_mobile: mobile,
        patient_situation: situation,
      },
    ]);
    await setLoading(false);
    await setOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="container-w-flex consultant-details">
        <h2 style={{ textAlign: "center" }}>
          Some Details for your Consultant
        </h2>
        <br />
        <br />
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
          required
          type={"text"}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          fullWidth
          required
          type={"text"}
          id="outlined-basic"
          label="Mobile"
          variant="outlined"
        />
        <br />
        <br />
        <textarea
          value={situation}
          onChange={(e) => {
            setSituation(e.target.value);
          }}
          rows={20}
          required
          placeholder="Describe Your Current Situation"
        />
        <LoadingButton
          onClick={submitData}
          fullWidth
          type="submit"
          className={loading ? "" : "primary-btn"}
          variant="contained"
          loading={loading}
        >
          Sumbit
        </LoadingButton>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully submitted data to your consultant
        </Alert>
      </Snackbar>
    </>
  );
};

export default ConsultingDetails;
