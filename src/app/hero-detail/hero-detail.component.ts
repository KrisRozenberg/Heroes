import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Hero} from "../hero";
import { HeroService } from '../hero.service';
import {HeroRace} from "../hero-race";
import {HeroClass} from "../hero-class";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  path?: string;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.path = this.route.routeConfig?.path;

    if(this.path != 'addHero') {
      this.getHero();
    }
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {this.hero = hero;
      console.log(hero);
      console.log(this.hero)});
  }

  goBack(): void {
    this.location.back();
  }

  saveHero(hero: Hero): void {
    this.hero = hero;

    console.log("save hero method");
    if (this.path == 'addHero') {
      console.log("Here");
      this.heroService.addHero(this.hero)
        .subscribe(_ => {
          this.router.navigateByUrl('/heroes').then();
        });
    }
    else {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  getHeroRace(value: HeroRace): string {
    return HeroRace[value];
  }

  getHeroClass(value: HeroClass): string {
    return HeroClass[value];
  }
}
