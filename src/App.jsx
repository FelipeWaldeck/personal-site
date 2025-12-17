import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import WorkMain from "./pages/WorkMain";
import Error from "./pages/Error";
import Renders from "./pages/Renders";
import Reading from "./pages/Reading";
import CV from "./pages/CV";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/work/:name" element={<WorkMain></WorkMain>}></Route>
        <Route
          exact
          path="/Miscellaneous"
          element={<Renders></Renders>}
        ></Route>
        <Route exact path="/reading" element={<Reading></Reading>}></Route>
        <Route exact path="/cv" element={<CV></CV>}></Route>

        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </Router>
  );
}
