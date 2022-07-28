import {HeroRace} from "./hero-race";
import {HeroClass} from "./hero-class";

export interface Hero {
  id: number;
  name: string;
  race: HeroRace,
  heroClass: HeroClass,
  level: number
}
