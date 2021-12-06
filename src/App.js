import { useEffect } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Nav from "./components/Nav";
import DetailedWeather from "./Routes/DetailedWeather";
import Home from "./Routes/Home";
import { useSelector, useDispatch } from 'react-redux'
import { getWeather } from './helpers/getWeather'
import { setWeather } from './state/placeList'


function App() {
  const dispatch = useDispatch()
  const place = useSelector(state => state.weather.placeList)

  // Store places in localStorage
  useEffect(() => {
    const myStorage = window.localStorage
    myStorage.setItem('placeList', JSON.stringify(place.map(item => item.searchName)))
  }, [place])

  //Checks for local preference for theme.
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (localStorage.theme === 'dark' || localStorage.theme === null) {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  // Fetch weather for each location
  useEffect(() => {
    place.forEach(item => {
      const fetchWeather = async (place) => {
        if (!place.weather) {
          getWeather(place.searchName)
            .then(res => {
              dispatch(setWeather({
                searchName: place.searchName,
                weather: res
              }))
            })
            .catch(err => console.log(err))
        }
      }
      fetchWeather(item)
    })
  }, [place, dispatch])

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home place={place} />} />
        <Route path="/place/:name" exact element={<DetailedWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
