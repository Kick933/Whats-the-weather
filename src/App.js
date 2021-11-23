import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Nav from "./components/Nav";
import DetailedWeather from "./Routes/DetailedWeather";
import Home from "./Routes/Home";


function App() {
  const [place, setPlace] = useState(['Narnaund'])
  // get places from localStorage
  useEffect(() => {
    const myStorage = window.localStorage
    const val = JSON.parse(myStorage.getItem('placeList'))
    if (val !== null) {
      setPlace(val)
    }
    console.log("No previous records found in localStorage")
  }, [])

  // Store places in localStorage
  useEffect(() => {
    const myStorage = window.localStorage
    myStorage.setItem('placeList', JSON.stringify(place))
  }, [place])

  //Checks for local preference for theme.
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (localStorage.theme === 'dark' || localStorage.theme === null) {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])
  // Delete a card.
  function deleteResult(arg) {
    setPlace(t => {
      return [
        ...t.filter(item => item !== arg)
      ]
    })
  }

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home place={place} deleteResult={deleteResult} setPlace={setPlace} />} />
        <Route path="/place/:name" exact element={<DetailedWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
