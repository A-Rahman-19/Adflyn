import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import Footer from "./component/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Toaster position="top-center" reverseOrder={false} />
          <AppRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
