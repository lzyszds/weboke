
// 假设 useDateFormat 已经正确处理时间和返回数字或可转换为数字的字符串
// 假设 img 对象中的所有属性都是预定义且正确的

// 使用 enum 来管理天气状况
enum WeatherConditions {
  Sunny = '晴',
  Cloudy = '多云',
  NightCloudy = '少云',
  CloudyDay = '阴',
  Shower = '阵雨',
  ThundershowersSunny = '雷阵雨',
  SleetRain = '雨夹雪',
  Rain = '雨',
  ModerateRain = '中雨',
  HeavyRain = '大雨',
  Foggy = '霾',
  Dust = '浮尘',
  Sleet = '冻雨',
  Snow = '雪',
  Snowstorm = '暴雪',
  HeavySnow = '大雪',
  Sand = '扬沙',
  Sandstorm = '沙尘暴',
  Tornado = '龙卷风',
  Wind = '风',
  Undefined = 'undefind',
}

const img = {
  "Cloudy": new URL("./Cloudy.svg", import.meta.url),
  "CloudyDay": new URL("./CloudyDay.svg", import.meta.url),
  "Dust": new URL("./Dust.svg", import.meta.url),
  "Foggy": new URL("./Foggy.svg", import.meta.url),
  "HeavyRain": new URL("./HeavyRain.svg", import.meta.url),
  "HeavySnow": new URL("./HeavySnow.svg", import.meta.url),
  "PartlyCloudy": new URL("./PartlyCloudy.svg", import.meta.url),
  "Rain": new URL("./Rain.svg", import.meta.url),
  "ModerateRain": new URL("./Rain.svg", import.meta.url),
  "RainSnow": new URL("./RainSnow.svg", import.meta.url),
  "Sand": new URL("./Sand.svg", import.meta.url),
  "Sandstorm": new URL("./Sandstorm.svg", import.meta.url),
  "Shower": new URL("./Shower.svg", import.meta.url),
  "Sleet": new URL("./Sleet.svg", import.meta.url),
  "SleetRain": new URL("./SleetRain.svg", import.meta.url),
  "Snow": new URL("./Snow.svg", import.meta.url),
  "Snowstorm": new URL("./Snowstorm.svg", import.meta.url),
  "Sunny": new URL("./Sunny.svg", import.meta.url),
  "ThundershowersSunny": new URL("./ThundershowersSunny.svg", import.meta.url),
  "Thunderstorm": new URL("./Thunderstorm.svg", import.meta.url),
  "Tornado": new URL("./Tornado.svg", import.meta.url),
  "Wind": new URL("./Wind.svg", import.meta.url),
  "nightImg": {
    "Cloudy": new URL("./NightCloudy.svg", import.meta.url),
    "LessCloudy": new URL("./NightLessCloudy.svg", import.meta.url),
    "Sunny": new URL("./NightSunny.svg", import.meta.url),
  },
  "undefined": new URL("./undefined.svg", import.meta.url),
}


export function handleWeatherUrl(...args): string {
  const [data, isdark] = args;
  console.log(`lzy  data, isdark:`, data, isdark)

  // 使用对象映射来代替 switch 语句，提高查找效率和可维护性
  const weatherImgMap = {
    [WeatherConditions.Sunny]: isdark ? img.nightImg.Sunny : img.Sunny,
    [WeatherConditions.Cloudy]: isdark ? img.nightImg.Cloudy : img.Cloudy,
    [WeatherConditions.NightCloudy]: isdark ? img.nightImg.Cloudy : img.Cloudy,
    [WeatherConditions.CloudyDay]: img.CloudyDay,
    [WeatherConditions.Shower]: img.Shower,
    [WeatherConditions.ThundershowersSunny]: img.ThundershowersSunny,
    [WeatherConditions.SleetRain]: img.SleetRain,
    [WeatherConditions.Rain]: img.Rain,
    [WeatherConditions.ModerateRain]: img.ModerateRain,
    [WeatherConditions.HeavyRain]: img.HeavyRain,
    [WeatherConditions.Foggy]: img.Foggy,
    [WeatherConditions.Dust]: img.Dust,
    [WeatherConditions.Sleet]: img.Sleet,
    [WeatherConditions.Snow]: img.Snow,
    [WeatherConditions.Snowstorm]: img.Snowstorm,
    [WeatherConditions.HeavySnow]: img.HeavySnow,
    [WeatherConditions.Sand]: img.Sand,
    [WeatherConditions.Sandstorm]: img.Sandstorm,
    [WeatherConditions.Tornado]: img.Tornado,
    [WeatherConditions.Wind]: img.Wind,
    [WeatherConditions.Undefined]: img.undefined, // 确保这是定义好的
  };

  const selectedImage = weatherImgMap[data.weather] || img.undefined;
  return selectedImage.href
}


export default handleWeatherUrl;
