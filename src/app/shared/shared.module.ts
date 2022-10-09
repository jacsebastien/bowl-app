import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { SubscriptionBaseComponent } from './components/subscription-base/subscription-base.component';

@NgModule({
  declarations: [SubscriptionBaseComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, SubscriptionBaseComponent, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
