import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import DetailedWeather from "./Routes/DetailedWeather";
import Home from "./Routes/Home";


function App() {
  const [place, setPlace] = useState(['Narnaund'])
  // get places from localStorage
  useEffect(() => {
    const myStorage = window.localStorage
    const val = JSON.parse(myStorage.getItem('placeList'))
    if (val !== null) {
      console.log("No previous records found in localStorage")
      setPlace(val)
    }
  }, [])

  // Store places in localStorage
  useEffect(() => {
    const myStorage = window.localStorage
    myStorage.setItem('placeList', JSON.stringify(place))
  }, [place])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home place={place} setPlace={setPlace} />} />
        <Route path="/place/:name" exact element={<DetailedWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
