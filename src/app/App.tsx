import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <Outlet />
    </main>
  );
}

export default App;
