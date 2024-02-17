export interface weatherForFiveDays{
    Date: string;
    Temperature: {
        Minimum: {
            Value: Number;
            Unit: String;
        },
        Maximum: {
            Value: Number;
            Unit: string;
        }
    }
    Day: {
        PrecipitationIntensity: string,
        PrecipitationType: string
    }
    Night: {
        PrecipitationIntensity: string,
        PrecipitationType: string
    }
}