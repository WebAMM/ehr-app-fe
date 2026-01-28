import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterConfig } from "./Navigation/RouterConfig";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
