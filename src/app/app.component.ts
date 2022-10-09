import { Component, OnInit } from '@angular/core';
import { PlayersService } from './shared/services/players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private playersSrv: PlayersService) {}

  ngOnInit(): void {
    this.playersSrv.create('Joueur 1');
  }
}
