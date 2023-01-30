import Navbar from "../components/Navbar";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import DishCard from "../components/DishCard";

const Food = () => {
  const [food, setFood] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const search = async () => {
    setLoading(true);
    const d = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
    );
    const pd = await d.json();
    await localStorage.setItem("recipies", JSON.stringify(pd.hits));
    await setLoading(false);
    await setData(JSON.parse(localStorage.getItem("recipies")));
    await console.log(data);
  };
  return (
    <>
      <Navbar />
      <div className="container-w-flex">
        <h2>Food</h2>
        <br />
        <TextField
          value={food}
          onChange={(e) => {
            setFood(e.target.value);
          }}
          type={"text"}
          required
          fullWidth
          id="outlined-basic"
          label="Search for a recipe"
          variant="outlined"
        />
        <br />
        <br />
        <LoadingButton
          onClick={() => {
            search();
          }}
          fullWidth
          type="submit"
          className={loading ? "" : "primary-btn"}
          variant="contained"
          loading={loading}
        >
          Search
        </LoadingButton>
        {data &&
          data.map((data) => (
            <>
              <DishCard
                data={{
                  name: data.recipe.label,
                  imgURL: data.recipe.images.SMALL.url,
                  URL: data.recipe.url,
                }}
              />
            </>
          ))}
      </div>
    </>
  );
};

export default Food;
