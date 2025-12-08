import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<Toast>();

  toast$: Observable<Toast> = this.toastSubject.asObservable();

  constructor() {}

  success(message: string, delay?: number) {
    this._show({ message, type: 'success', delay });
  }

  error(message: string, delay?: number) {
    this._show({ message, type: 'error', delay });
  }

  warning(message: string, delay?: number) {
    this._show({ message, type: 'warning', delay });
  }

  private _show(toast: Toast) {
    toast.delay = toast.delay || 5000;
    console.log('toast', toast);
    this.toastSubject.next(toast);
  }
}
