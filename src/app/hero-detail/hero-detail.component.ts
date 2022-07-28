import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Hero} from "../hero";
import { HeroService } from '../hero.service';
import {HeroRace} from "../hero-race";
import {HeroClass} from "../hero-class";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required]),
    race: new FormControl(null, [
      Validators.required]),
    heroClass: new FormControl(null, [
      Validators.required]),
    level: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]{1,2}$"),
      Validators.min(1),
      Validators.max(99)])
  });
  hero?: Hero;
  path?: string;
  message?: string;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.path = this.route.routeConfig?.path;

    if(this.path != 'addHero') {
      this.getHero();
    }

    if(this.path == 'editHero/:id') {
      this.initEditForm();
    }
  }

  initEditForm(): void {
    this.heroForm.controls['name'].setValue(this.hero?.name);
    this.heroForm.controls['race'].setValue(this.hero?.race);
    this.heroForm.controls['heroClass'].setValue(this.hero?.heroClass);
    this.heroForm.controls['level'].setValue(this.hero?.level);
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

  saveHero(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  addHero(): void {
    const name = this.heroForm.controls['name'].value.trim();
    const race = this.heroForm.controls['race'].value;
    const heroClass = this.heroForm.controls['heroClass'].value;
    const level = this.heroForm.controls['level'].value;

    this.heroService.addHero({name, race, heroClass, level} as unknown as Hero)
      .subscribe(_ => {
        this.router.navigateByUrl('/heroes').then();
      });
  }

  getHeroRace(value: HeroRace): string {
    return HeroRace[value];
  }

  getHeroClass(value: HeroClass): string {
    return HeroClass[value];
  }

  isFormValid() {
    return this.heroForm.valid;
  }
}
