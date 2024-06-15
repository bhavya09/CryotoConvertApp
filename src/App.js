import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const arr = ["usd", "eur", "gbp", "cny", "jpy"];

  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [diff, setDiff] = useState(0);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCurrency(val);
  };

  const handleCurrencyType = (e) => {
    const type = e.target.value;
    console.log("current ", e.target.value);
    setSelectedCurrency(type);
  };

  const fetchCurrencyInfo = async () => {
    try {
      const url = `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`;

      const result = await fetch(url);
      const data = await result.json();
      const val = data.value;
      console.log("currency", currency);
      console.log("val", val);
      const showCurr = currency * val;
      setConvertedCurrency(showCurr.toFixed(2));

      const prevValue = window.sessionStorage.getItem("prevVal");

      console.log("prevValue", prevValue);
      console.log("currentValue", showCurr.toFixed(2));

      const diff = showCurr.toFixed(2) - prevValue;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDiff(diff.toFixed(2));

      // console.log("diff", diff);

      window.sessionStorage.setItem("prevVal", showCurr.toFixed(2));
    } catch (err) {
      console.log("Error :", err);
    }
  };

  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 3000);

    return () => {
      clearInterval(time);
    };
  }, [currency, selectedCurrency]);

  return (
    <div className="App">
      <h1>Cryoto Convert App</h1>
      <div className="wrapper">
        <input type="number" value={currency} onChange={handleInputChange} />

        <select
          onChange={handleCurrencyType}
          name="currency"
          value={selectedCurrency}
        >
          {arr.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="curr-info">
        <div>{convertedCurrency}</div>
        <div>WUC</div>
        <div className={isUp ? "green" : "red"}>
          <span>{isUp ? "↑" : "↓"}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
}
