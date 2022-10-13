import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.baseURL = "http://localhost:8000/";

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const getData = (data) => {
    axios.post(`api/paytm-payment`, data).then((response) => {
      // console.log("info===========", response.data[0]);
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response.data,
      };
      post(information);
    });
    // return fetch(`http://localhost:8000/api/paytm-payment`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: data,
    // })
    //   .then((response) => response.json())
    //   .catch((err) => console.log(err));
  };

  // let info = {
  //   amount: 500,
  //   email: "srabon@gmail.com",
  // };

  function makePayment() {
    getData({ amount: 1200, email: "srabon@gmail.com" });
    // .then((response) => {
    //   var information = {
    //     action: "https://securegw-stage.paytm.in/order/process",
    //     params: response,
    //   };
    //   post(information);
    // });
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button className="btn btn-success" onClick={makePayment}>
          Pay Now
        </Button>
      </header>
    </div>
  );
}

export default App;
