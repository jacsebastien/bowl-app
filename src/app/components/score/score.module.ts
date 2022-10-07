import { NgModule } from '@angular/core';
import { ScoreTableComponent } from './score-table/score-table.component';
import { ScoreFormComponent } from './score-form/score-form.component';
import { ScoreComponent } from './score.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ScoreTableComponent, ScoreFormComponent, ScoreComponent],
  imports: [SharedModule],
  exports: [ScoreComponent],
})
export class ScoreModule {}
