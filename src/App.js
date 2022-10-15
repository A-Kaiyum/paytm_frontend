import PaytmPaynow from "./components/PaytmPaynow";
import axios from "axios";
import PaytmRoutes from "./PaytmRoutes";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.baseURL = "http://localhost:8000/";

  return (
    <>
      <PaytmRoutes />
    </>
  );
}

export default App;
