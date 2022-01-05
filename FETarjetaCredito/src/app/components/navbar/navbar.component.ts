import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: string = '';
  constructor(private accountService: AccountService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem("usuario") || '';
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.accountService.logout();
    this.usuario = '';
    this.toastr.warning('Sesión finalizada!','Warning!');
    this.router.navigate(['/']);
  }

  estaLogueado() {
    return this.accountService.estaLogueado();
  }

  validaLogin(){
    if (!this.estaLogueado()) {
      this.router.navigate(['/register-login']);
      this.toastr.error('Inicie sesión!','Warning!');
    }
  }
}
