import { useNavigate } from "react-router-dom";

const DashCard = ({ name, link, img }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(link);
      }}
      className="dash-card"
    >
      <img src={img} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default DashCard;
