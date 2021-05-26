import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import Routes from "./routes";
import Store from "./store";

const App = () => {
  return (
    <Store>
      <Routes />
    </Store>
  );
};

export default App;
