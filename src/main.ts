import 'zone.js/dist/zone';
import { Component, OnInit, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { from, of } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App implements OnInit{
  name = 'Angular'+VERSION.major;


  ngOnInit(){
    // of and from both generate observables, but they are different
    const apples =['apple1','apple2'];
    from(apples).subscribe(item=>console.log(item));   // apple1, apple2
    of(apples).subscribe(item=>console.log(item));     // [apple1, apple2]
    // ... js spreader function
    of(...apples).subscribe(item=>console.log(item));  //apple1 apple2


    console.log("============");
    of (2,4,6).subscribe(item=>console.log(item));

    from([10,20,30]).subscribe(
      {
        next: (item) => console.log(`Result: ${item}`),
        error: (err) => console.log(`error occured..${err}`),
        complete:() => console.log('complete'),
      }
    )
  }

}

bootstrapApplication(App);
