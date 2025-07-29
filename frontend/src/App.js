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
        <main className="app-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
     </>
  );
}

export default App;
