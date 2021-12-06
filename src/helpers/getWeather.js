export const getWeather = async (place) => {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.REACT_APP_KEY}&units=metric`)
    const data = await rawData.json()
    return data
}