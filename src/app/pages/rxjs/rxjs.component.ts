import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // this.regresaObervable().pipe(
    //   retry(2)
    // ).
    this.subscription = this.regresaObervable().
    subscribe(
      numero => console.log('numero ', numero),
      error => console.error('error en el obs', error),
      () => console.log('el obs termino')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

  regresaObervable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        // observer.next( contador );
        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval( intervalo );
        //   observer.error('pete');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );

  }
}
