import { useState } from "react";
import CustomForm from "./components/Form";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CustomForm />
    </div>
  );
}

export default App;
