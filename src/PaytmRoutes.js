import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PaymentStatus from "./components/PaymentStatus";
import PaytmPaynow from "./components/PaytmPaynow";
export default function PaytmRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <PaytmPaynow />
        </Route>
        <Route path="/status/:orderId" exact>
          <PaymentStatus />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
