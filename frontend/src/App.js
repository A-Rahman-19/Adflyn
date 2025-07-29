import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
