import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../../../shared/models/score';
import { ScoresService } from '../../../shared/services/scores.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss'],
})
export class ScoreTableComponent {
  scoresObs: Observable<Score[]> = this.scoresSrv.scoresObs;
  rounds: number[] = Array.from({ length: this.scoresSrv.numberOfRounds }, (_, i) => i + 1);

  constructor(private scoresSrv: ScoresService) {}
}
