import { Console, Effect } from "effect";

const program = Console.log("Weather CLI");

Effect.runSync(program);
