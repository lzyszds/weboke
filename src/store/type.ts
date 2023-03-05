export interface NowWeatherData {
  data: {
    token: string,
    ip: string,
    region: string,
    tags: [],
    beijingTime: Date,
    weatherData: object
  }
  status: string
}
