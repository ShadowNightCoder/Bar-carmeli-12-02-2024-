export interface CurrentCity {
    weatherText: string;
    timeRightNow: string;
    weatherIcon: string;
    temperatureImperial: {
        value: number | null | string;
        unit: string;
        unitType: number;

    };
}