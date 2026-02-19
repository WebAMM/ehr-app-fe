import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterConfig } from "./Navigation/RouterConfig";
import { ToastContainer } from "./components/ui/Toast";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
