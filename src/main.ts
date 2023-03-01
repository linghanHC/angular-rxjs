import 'zone.js/dist/zone';
import { Component, OnInit, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  from,
  of,
  map,
  tap,
  take,
  catchError,
  filter,
  combineLatest,
} from 'rxjs';

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
export class App implements OnInit {
  name = 'Angular' + VERSION.major;

  ngOnInit() {
    // console.log("======create function for observables======");

    // // of and from both create observables, but they are different
    // const apples =['apple1','apple2'];
    // from(apples).subscribe(item=>console.log(item));   // apple1, apple2
    // of(apples).subscribe(item=>console.log(item));     // [apple1, apple2]
    // // ... js spreader function
    // of(...apples).subscribe(item=>console.log(item));  //apple1 apple2

    // console.log("=====rxjs operators=======");

    // of (1,2,3).pipe(
    //   map(item=>item*2),    // transforms each emitted item
    //   tap(item=>console.log("*", item)),  //tap into the emissions without affecting the items, used for debugging or performing actions outside of the flow of data (side effects, eg change the counter, )
    //   take(2) // emits a specified number of items
    // ).subscribe(x=>console.log(x));

    // console.log("=====rxjs handling errors=======");
    // from([10,20,30]).pipe(
    //   tap(item=>console.log(`emitted item..${item}`)),
    //   map(item=>item*2+10),
    //   map(item=>{
    //     if(item>50){
    //       throw new Error('large value detected');
    //     }
    //     return item;
    //   })
    // ).subscribe(
    //   {
    //     next: (x) => console.log(`Result: ${x}`),
    //     error: (err) => console.log(`error occured..${err}`),   // error thrown is displayed in console
    //     complete:() => console.log('complete'),
    //   }
    // )

    // // catchError
    // from([2,4,6]).pipe(
    //   map(item=>{
    //     if(item===6){
    //       throw 'Error!!'
    //     }
    //     return item;
    //   }),
    //   catchError(err=>of('six'))
    // ).subscribe(
    //   {
    //     next: (x) => console.log(`x=${x}`),   // error as observable is displayed in console
    //     error: (err) => console.log(`error occured..${err}`),
    //     complete:() => console.log('complete'),
    //   }
    // )

    // throwError

    // EMPTY

    console.log('=====combine data streams=======');

    // combineLatest
    const arr1$ = of([
      {
        mfid: 'B02-20160301-023',
        descid: ['1', '2'],
      },
      {
        "id": "B02-20160301-024",
        "descid": ["2","3"]
      }
    ]);
    const arr2$ = of([
      {
        id: '1',
        en: 'a',
        fr: 'a',
      },
      {
        id: '2',
        en: 'b',
        fr: 'b',
      },
      {
        id: '3',
        en: 'c',
        fr: 'c',
      },
    ]);

    const arr3$ = combineLatest([arr1$, arr2$])
      .pipe(
        map(([arr1, arr2]) => {
          return arr1.map((item) => ({
            id: item.mfid,
            descriptions: arr2.filter((unit) => {return item.descid.includes(unit.id)}),
            // descriptions: item.descid.map((x) => {
            //   arr2.filter((unit) => {return unit.id === x});
            // }),
            // descriptions: arr2.filter((unit) => {return unit.id === item.descid[0]}),

          }));
        })
      )
      .subscribe((item) => console.log(item));

    // forkJoin

    // withLatestFrom

    console.log('=====rxjs operator=======');

    // filter
    of('a', 'b', 'a')
      .pipe(filter((item) => item === 'a'))
      .subscribe((item) => console.log(item));
  }
}

bootstrapApplication(App);

function dothis(arr2, item) {
  // return arr2.filter(
  //   unit => unit.id === item.descid[0]
  // )

  return item.descid.map((x) => {
    console.log('x', x);
    arr2.filter((unit) => unit.id === x);
  });
}
