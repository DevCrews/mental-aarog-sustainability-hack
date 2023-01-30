import Navbar from "../components/Navbar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const Activities = () => {
  return (
    <>
      <Navbar />
      <div className="container-w-flex wallet">
        <h2>Activities and Rewards</h2>
        <p>Your crypto balance</p>
        <div className="flex-center">
          {/* <img style={{ height: "80px" }} src="/assets/hexa.jpg" alt="logo" /> */}
        </div>
        <div className="dash-card dash-card-auto ">
          <h2 style={{ textAlign: "center" }}>KENKO / USDT</h2>
          <h1 style={{ textAlign: "center" }}>
            {Math.floor(Math.random() * 10 + 1) +
              "." +
              String(Math.floor(Math.random() * 100) + 1)}
          </h1>
          <p>~$21.43</p>
        </div>
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          theme={Themes.DARK}
          locale="fr"
          height={300}
          width={350}
        />
      </div>
    </>
  );
};

export default Activities;
