import Navbar from "../components/Navbar";

const SmartWatch = () => {
  return (
    <>
      <Navbar />
      <div className="container-w-flex">
        <h2>Smart Watch</h2>
        <div className="dash-card dash-card-auto">
          <p>FireBolt 360</p>
        </div>
        <div className="dash-card dash-card-auto">
          <h2>Steps</h2>
          <h1>{Math.floor(Math.random() * (5000 - 1000 + 1) + 1000)}</h1>
        </div>
        <div className="dash-card dash-card-auto">
          <h2>Sleep</h2>
          <h1>
            {Math.floor(Math.random() * (5 - 4 + 1) + 4) +
              "." +
              String(Math.floor(Math.random() * 100) + 1)}
            h
          </h1>
        </div>
      </div>
    </>
  );
};

export default SmartWatch;
