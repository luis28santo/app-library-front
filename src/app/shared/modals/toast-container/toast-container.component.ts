import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Toast, ToastService } from '../../../core/service/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'toast-container',
  imports: [],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  currentToast: Toast | null = null;
  private toastSubscription!: Subscription;
  private timeoutId: any;

  constructor(private _toastSrv: ToastService, private _cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.toastSubscription = this._toastSrv.toast$.subscribe((toast) => {
      this.currentToast = toast;
      this.startTimer(toast.delay!);
      this._cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
    this.clearTimer();
  }

  startTimer(delay: number) {
    this.clearTimer();

    this.timeoutId = setTimeout(() => {
      this.hideToast();
    }, delay);
  }

  hideToast() {
    this.currentToast = null;
    this.clearTimer();
  }

  clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
