export interface WeatherData {
  token: string,
  ip: string,
  region: string,
  tags: [],
  beijingTime: Date,
  weatherData: any
}
export interface ipGetType {
  data: WeatherData,
  status: string
}
