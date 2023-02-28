import 'zone.js/dist/zone';
import { Component, OnInit, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { from, of, map, tap, take } from 'rxjs';

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
    console.log("======create function for observables======");

    // of and from both create observables, but they are different
    const apples =['apple1','apple2'];
    from(apples).subscribe(item=>console.log(item));   // apple1, apple2
    of(apples).subscribe(item=>console.log(item));     // [apple1, apple2]
    // ... js spreader function
    of(...apples).subscribe(item=>console.log(item));  //apple1 apple2

    console.log("=====rxjs operators=======");

    of (1,2,3).pipe(
      map(item=>item*2),    // transforms each emitted item
      tap(item=>console.log("*", item)),  //tap into the emissions without affecting the items, used for debugging or performing actions outside of the flow of data (side effects, eg change the counter, )
      take(2) // emits a specified number of items
    ).subscribe(x=>console.log(x));

    from([10,20,30]).pipe(
      tap(item=>console.log(`emitted item..${item}`)),
      map(item=>item*2+10),
      map(item=>{
        if(item>50){
          throw new Error('large value detected');
        }
        return item;
      })
    ).subscribe(
      {
        next: (x) => console.log(`Result: ${x}`),
        error: (err) => console.log(`error occured..${err}`),
        complete:() => console.log('complete'),
      }
    )
  }

}

bootstrapApplication(App);
