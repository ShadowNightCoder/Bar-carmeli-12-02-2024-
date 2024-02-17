// convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
    return parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(1));
}

export function celsiusToFahrenheit(celsius: number): number {
    return parseFloat(((celsius * 9 / 5) + 32).toFixed(1));
}


export function isEnglishLettersOnly(value: string): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
}


// feature is not finished, it needs some work.
export function dayOrNight(cityTime: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const time = new Date(cityTime);
        const hour = time.getHours();

        if (hour >= 5 && hour < 20) {
            resolve("day");
        } else {
            resolve("night");
        }
    });
}
