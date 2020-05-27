import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    timer(1000).subscribe(() => this.auth.login());
  }

}
