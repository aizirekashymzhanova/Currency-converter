import { useState, useEffect } from "react";
import axios from "axios";
import CurrencyForm from "../CurrencyForm/CurrencyForm";
import PropTypes from "prop-types";

function Converter() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [amount3, setAmount3] = useState(1);
  const [amount4, setAmount4] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [currency3, setCurrency3] = useState("EUR");
  const [currency4, setCurrency4] = useState("UAH");
  const [rates, setRates] = useState([]);
  const API = "https://cdn.cur.su/api/latest.json";

  useEffect(() => {
    axios.get(API).then((response) => {
      setRates(response.data.rates);
    });
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);
  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount4Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }
  function handleAmount4Change(amount4) {
    setAmount4(format((amount3 * rates[currency4]) / rates[currency3]));
    setAmount3(amount3);
  }

  return (
    <div
      style={{
        backgroundColor: "green",
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
      }}
    >
      <div>
        <span style={{ marginRight: "60px" }}>{amount1} </span>
        <span> {currency1}</span> <br />
        <span> {amount2}</span>
        <span>{currency2}</span>
      </div>
      <div>
        <span style={{ marginRight: "60px" }}>{amount3} </span>
        <span> {currency3}</span> <br />
        <span> {amount4}</span>
        <span>{currency4}</span>
      </div>
    </div>
  );
}

export default Converter;
