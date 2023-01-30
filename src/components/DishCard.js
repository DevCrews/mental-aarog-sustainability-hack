import { Button } from "@mui/material";

const DishCard = ({ data }) => {
  return (
    <div className="book-card">
      <img src={data.imgURL} alt="book" />
      <div>
        <h3>{data.name}</h3>
        <Button variant="contained" className="secondary-btn">
          <a className="no-links" href={data.URL}>
            Get Recipes
          </a>
        </Button>
      </div>
    </div>
  );
};

export default DishCard;
