import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {HeroRace} from "./hero-race";
import {HeroClass} from "./hero-class";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Edward Elric', race: HeroRace.Human, heroClass: HeroClass.Mage, level: 71 },
      { id: 13, name: 'Alphonse Elric', race: HeroRace.Human, heroClass: HeroClass.Mage, level: 68 },
      { id: 14, name: 'Van Hohenheim', race: HeroRace.Human, heroClass: HeroClass.Clown, level: 54 },
      { id: 15, name: 'Envy', race: HeroRace.Homuncul, heroClass: HeroClass.Mage, level: 65 },
      { id: 16, name: 'Greed', race: HeroRace.Homuncul, heroClass: HeroClass.Warrior, level: 45 },
      { id: 17, name: 'Ling Yao', race: HeroRace.Human, heroClass: HeroClass.Clown, level: 83 },
      { id: 18, name: 'Xiao-Mei', race: HeroRace.Creature, heroClass: HeroClass.Warrior, level: 15 },
      { id: 19, name: 'Riza Hawkeye', race: HeroRace.Human, heroClass: HeroClass.Warrior, level: 75 },
      { id: 20, name: 'Lan Fan', race: HeroRace.Human, heroClass: HeroClass.Warrior, level: 88 }
    ];
    return {heroes};
  }
}
