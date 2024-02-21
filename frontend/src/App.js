import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

function App() {

  const {modal} = useSelector(state => state.modal);
  console.log(modal)

  return (
    <div>
      <Router>
        <Navbar />
        {modal && <Modal/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
