export interface CurrentWeather {
  LocalObservationDateTime: string;
  WeatherText: string;
  WeatherIcon: number;
  Temperature: {
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
}