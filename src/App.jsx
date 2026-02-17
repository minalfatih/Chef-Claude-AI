import React from "react";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [start, setStart] = React.useState(false)
  const mainSection = React.useRef(null)

  // console.log(start);
  function toggleStart() {
    setStart(prevStart => !prevStart)
    // console.log(start);
  }

  React.useEffect(() => {
    if (start) {
      mainSection.current.scrollIntoView()
      setStart(prevStart => !prevStart)
    }
  }, [start])

  return (
    <>
      <Header />
      <Hero onStart={toggleStart} />
      <Main mainRef={mainSection} />
      <Footer />
    </>
  );
}

export default App;
