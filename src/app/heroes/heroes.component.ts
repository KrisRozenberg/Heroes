import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  numberMessage?: string;
  lastEditedMessage?: string;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.heroService.heroesNumber.subscribe(number => this.numberMessage = number + " heroes left!");
    this.heroService.lastEditedHero.subscribe(name => this.lastEditedMessage = "Last edited Hero: " + name);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
    this.heroService.getHeroesNumber();
  }
}
