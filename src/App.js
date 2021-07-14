import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import Routes from "./routes";
import Store from "./store";
import { Toaster } from "react-hot-toast";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const App = () => {
  return (
    <Store>
      <Toaster />
      <Routes />
    </Store>
  );
};

export default App;
