import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Round, Score } from '../models/score';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private scoresSubject = new BehaviorSubject<Score[]>([]);
  readonly scoresObs = this.scoresSubject.asObservable();
  readonly numberOfRounds = 10;

  constructor(private playersSrv: PlayersService) {}

  initScores(): void {
    const players: string[] = this.playersSrv.players;
    const scores: Score[] = players.map((player) => ({
      player,
      rounds: Array.from({ length: this.numberOfRounds }, () => [3, 7]),
    }));
    this.scoresSubject.next(scores);
  }

  addScore(indexToUpdate: number, scoreToAdd: number): void {
    const scores: Score[] = this.scoresSubject.getValue();
    const playerRounds: Round[] = scores[indexToUpdate].rounds || [];

    const updatedRounds: Round[] = playerRounds.map((round, i) => {
      const previousRound = playerRounds[i - 1];
      if (round[0] != null) {
        round[1] = scoreToAdd;
      } else if (i === 0 || (previousRound && previousRound[1] != null)) {
        round[0] = scoreToAdd;
      }

      return round;
    });

    const updatedScores: Score[] = scores.map((playerScore, i) => {
      const rounds: Round[] = i === indexToUpdate ? updatedRounds : playerScore.rounds;
      return {
        ...playerScore,
        rounds,
      };
    });
    this.scoresSubject.next(updatedScores);
  }

  calculateRoundTotal(points: Round): number {
    return points.reduce((total, point) => (total += point), 0);
  }
}
