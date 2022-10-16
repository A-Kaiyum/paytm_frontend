import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PaymentStatus() {
  let params = useParams();
  const [paymentStatement, setPaymentStatement] = useState({});
  useEffect(() => {
    getPaymentStatement();
  }, []);

  const getPaymentStatement = () => {
    axios.get(`api/paytm-status/${params.orderId}`).then((res) => {
      setPaymentStatement(res.data.paytmStatement);
    });
  };

  return (
    <div>
      {paymentStatement?.status == "TXN_SUCCESS" ? (
        <div
          className="invoiceContainer card shadow mx-auto my-3"
          style={{ width: "25%", minHeight: "60vh" }}
        >
          <div className="card-body">
            <h2 className="text-center my-3">Thank for your Registration</h2>
            <p className="fw-bold">John Doe</p>
            <p>
              Order ID:
              <span className="text-muted">{paymentStatement.order_id}</span>
            </p>
            <p>
              TXN ID:
              <span className="text-muted">{paymentStatement.txn_id}</span>
            </p>
            <p className="fw-bold">April 17 2021</p>

            <div className="invoiceDetails">
              <div
                className="d-flex justify-content-between my-2"
                style={{ borderBottom: "1px solid gray" }}
              >
                <div>
                  <p>Pro Package</p>
                </div>
                <div>
                  <p>$500</p>
                </div>
              </div>

              <div
                className="d-flex justify-content-between my-2"
                style={{ borderBottom: "1px solid gray" }}
              >
                <div>
                  <p>Consulting</p>
                </div>
                <div>
                  <p>$500</p>
                </div>
              </div>

              <div
                className="d-flex justify-content-between my-2"
                style={{ borderBottom: "3px solid gray" }}
              >
                <div>
                  <p>Support</p>
                </div>
                <div>
                  <p>$500</p>
                </div>
              </div>

              <div
                className="d-flex justify-content-end my-2"
                style={{ borderBottom: "3px solid gray" }}
              >
                <div>
                  <p className="fw-bold">
                    Total : {paymentStatement.txn_amount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="invoiceContainer card shadow mx-auto my-3"
          style={{ width: "25%", minHeight: "60vh" }}
        >
          <div className="card-body">
            <h2 className="text-center my-3">Your Transection Failed!</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentStatus;
