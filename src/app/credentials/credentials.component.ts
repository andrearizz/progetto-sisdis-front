import { Component, OnInit } from '@angular/core';
import {SavepwService} from '../_services/savepw.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  constructor(savePwService: SavepwService) { }

  ngOnInit(): void {
  }

}
