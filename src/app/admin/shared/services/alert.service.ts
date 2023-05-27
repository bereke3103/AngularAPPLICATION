import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface IAlert {
  type: AlertType;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$ = new Subject();

  success(text: string) {
    const success: IAlert = {
      type: 'success',
      text: text,
    };

    this.alert$.next(success);
  }
  warning(text: string) {
    const warning: IAlert = {
      type: 'warning',
      text: text,
    };

    this.alert$.next(warning);
  }
  danger(text: string) {
    const danger: IAlert = {
      type: 'warning',
      text: text,
    };

    this.alert$.next(danger);
  }
}
