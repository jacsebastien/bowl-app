import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription-base',
  template: '',
  styleUrls: [],
})
export class SubscriptionBaseComponent implements OnDestroy {
  private subscriptions = new Subscription();

  protected addSubscription(newSub: Subscription): void {
    this.subscriptions.add(newSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
