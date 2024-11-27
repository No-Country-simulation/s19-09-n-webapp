import "./App.css";
import { Suspense } from "react";
import AppRouter from "./Router";
import Spinner from "./components/ui/Spinner";

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <AppRouter />
      </Suspense>
    </>
  );
}

export default App;
