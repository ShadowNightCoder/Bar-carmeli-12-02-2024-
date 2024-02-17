interface Temperature {
  Minimum: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Maximum: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  PrecipitationIntensity: string;
}

interface Night {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  PrecipitationIntensity: string;
}

export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: Temperature;
  Day: Day;
  Night: Night;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface WeatherData {
  Headline: {
    Text: string;
  };
  DailyForecasts: DailyForecast[];
}


export interface FiveDaysForecast{
  Date: string;
  Temperature: {
      Minimum: {
          Value: number;
          Unit: string;
      };
      Maximum: {
          Value: number;
          Unit: string;
      };
  };
  Day: {
      PrecipitationIntensity: string;
      PrecipitationType: string;
  };
  Night: {
      PrecipitationIntensity: string;
      PrecipitationType: string;
  };

}