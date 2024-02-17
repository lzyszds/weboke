export interface WeatherData {
  province: string,
  city: string,
  adcode: string,
  weather: string,
  temperature: string,
  winddirection: string,
  windpower: string,
  humidity: string,
  reporttime: string,
  temperature_float: string,
  humidity_float: string,
  ip: string
}
export interface ipGetType {
  data: WeatherData,
  status: string
}
