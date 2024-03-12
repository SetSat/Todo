import { useState } from "react";
import TodoApp from "./TodoApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TodoApp></TodoApp>
    </>
  );
}

export default App;
