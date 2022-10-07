import { Component, OnInit } from '@angular/core';
import { SubscriptionBaseComponent } from '../../../shared/components/subscription-base/subscription-base.component';
import { Round, Score } from '../../../shared/models/score';
import { ScoresService } from '../../../shared/services/scores.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css'],
})
export class ScoreTableComponent extends SubscriptionBaseComponent implements OnInit {
  scores: Score[] = [];
  rounds: number[] = [];

  constructor(private scoresSrv: ScoresService) {
    super();
  }

  ngOnInit(): void {
    this.initSubscriptions();
    this.rounds = Array.from({ length: this.scoresSrv.numberOfRounds }, (_, i) => i + 1);
    console.log(this.rounds);
  }

  getTotal(round: Round): number {
    return this.scoresSrv.calculateRoundTotal(round);
  }

  private initSubscriptions(): void {
    this.addSubscription(
      this.scoresSrv.scoresObs.subscribe((scores) => {
        this.scores = scores;
        console.log(this.scores);
      }),
    );
  }
}
