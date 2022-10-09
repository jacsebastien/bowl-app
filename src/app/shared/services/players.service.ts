import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private playersSubject = new BehaviorSubject<string[]>([]);
  readonly playersObs = this.playersSubject.asObservable();

  get players(): string[] {
    return this.playersSubject.getValue();
  }

  create(newPlayer: string): void {
    const updatedPlayers: string[] = [...this.players, newPlayer];

    this.playersSubject.next(updatedPlayers);
  }
}
