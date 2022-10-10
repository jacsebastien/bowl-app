import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayersService } from '../../shared/services/players.service';
import { ScoresService } from '../../shared/services/scores.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  playersObs: Observable<string[]> = this.playersSrv.playersObs;

  constructor(private playersSrv: PlayersService, private scoresSrv: ScoresService) {}

  ngOnInit(): void {
    this.onInitScores();
  }

  onInitScores(): void {
    this.scoresSrv.initScores();
  }
}
