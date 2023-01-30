import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../config";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ConnectCard from "../components/ConnectCard";

const Connect = () => {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [sharedD, setSharedD] = useState();

  useEffect(() => {
    const user = supabase.auth.user();
    async function fetchData() {
      const d = await supabase
        .from("phq9")
        .select()
        .match({ email: user.email });
      await setData(d.data[0]);
    }
    fetchData();
  }, []);
  const fetchDetails = async () => {
    setLoading(true);
    const d = await supabase.from("phq9").select().match({ share_id: id });
    const upd = await d.data[0];
    setSharedD(upd.phqdata);
    await setLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="container-w-flex connect">
        <h2>Connect</h2>
        {!data && <div className="spinner"></div>}
        {data && (
          <>
            <h4>Share ID : {data["share_id"]}</h4>
            Use this to share your data with your friends or family
          </>
        )}
        <TextField
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          type={"text"}
          required
          fullWidth
          id="outlined-basic"
          label="Shared ID"
          variant="outlined"
        />
        <br />
        <LoadingButton
          onClick={() => {
            fetchDetails();
          }}
          fullWidth
          type="submit"
          className={loading ? "" : "primary-btn"}
          variant="contained"
          loading={loading}
        >
          Get Details
        </LoadingButton>
        {sharedD &&
          JSON.parse(sharedD).map((d) => (
            <ConnectCard result={d.result} time={d.time} date={d.date} />
          ))}
      </div>
    </>
  );
};

export default Connect;
