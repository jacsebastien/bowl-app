import { Component, OnInit } from '@angular/core';
import { SubscriptionBaseComponent } from '../../shared/components/subscription-base/subscription-base.component';
import { Score } from '../../shared/models/score';
import { PlayersService } from '../../shared/services/players.service';
import { ScoresService } from '../../shared/services/scores.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent extends SubscriptionBaseComponent implements OnInit {
  scores: Score[] = [];
  players: string[] = [];

  constructor(private playersSrv: PlayersService, private scoresSrv: ScoresService) {
    super();
  }

  ngOnInit(): void {
    this.scoresSrv.initScores();
    this.initSubscriptions();
  }

  onReset(): void {
    this.scoresSrv.initScores();
  }

  private initSubscriptions(): void {
    this.addSubscription(
      this.scoresSrv.scoresObs.subscribe((scores) => {
        this.scores = scores;
      }),
    );
    this.addSubscription(
      this.playersSrv.playersObs.subscribe((players) => {
        this.players = players;
      }),
    );
  }
}
