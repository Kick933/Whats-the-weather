export const fetchOneCall = async (lat, lon) => {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)
    const data = await rawData.json()
    return data
}
