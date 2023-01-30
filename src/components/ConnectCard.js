const ConnectCard = ({ time, date, result }) => {
  return (
    <div className="dash-card">
      <p>{result}</p>
      <p>
        {time} , {date}
      </p>
    </div>
  );
};

export default ConnectCard;
