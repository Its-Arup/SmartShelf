import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import AllRoute from "./routes/AllRoute";
function App() {
  return (
    <div>  
      <Navbar />
      <AllRoute />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
