import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

function PaytmPaynow() {
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
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response.data,
      };
      post(information);
    });
  };

  function makePayment() {
    getData({ amount: 1200, email: "srabon@gmail.com" });
  }
  return (
    <div className="text-center mt-5">
      <Button className="btn btn-success" onClick={makePayment}>
        Pay Now
      </Button>
    </div>
  );
}

export default PaytmPaynow;
