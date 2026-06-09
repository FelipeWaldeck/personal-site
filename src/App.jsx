import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home.tsx';
import Error from './pages/Error';
import Renders from './pages/Renders';
import Reading from './pages/Reading';
import CV from './pages/CV';
import CaseStudy from './pages/CaseStudy';
import BouncingAscii from './components/BouncingAscii';

// The bouncing ASCII horse is a portfolio-wide easter egg, but it floats at
// z-9999 over everything — including the immersive case-study reads, where it
// bleeds through the dark canvas. Keep it off the /work/* routes.
function AmbientAscii() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/work/')) return null;
  return <BouncingAscii />;
}

export default function App() {
  return (
    <Router>
      <AmbientAscii />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/Miscellaneous"
          element={<Renders></Renders>}
        ></Route>
        <Route exact path="/reading" element={<Reading></Reading>}></Route>
        <Route exact path="/cv" element={<CV></CV>}></Route>
        <Route
          exact
          path="/work/:slug"
          element={<CaseStudy></CaseStudy>}
        ></Route>

        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </Router>
  );
}
