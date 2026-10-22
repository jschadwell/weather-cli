import { Console, Effect } from "effect";

const program = Console.log("Weather CLI");

Effect.runSync(program);

const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

url.search = new URLSearchParams({
    name: "Las Vegas, NV",
    count: "5",
    countryCode: "US"
}).toString();

const getGeocodes = Effect.tryPromise({
    try: async () => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Geocode request failed: ${response.status}`);
        }

        return response.json();
    },
    catch: (error) =>
        error instanceof Error ? error : new Error(String(error)),
});

Effect.runPromise(getGeocodes).then(
  (data) => console.log(data),
  (error) => console.error("Could not retrieve weather:", error),
);

