import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUserInfo } from '../user-info';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

//email: prueba
//password: A123123-fwf23cs

//emai: prueba2
//password: A123123-fwf2432

export class RegisterComponent implements OnInit {  
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  formGroup: FormGroup = this.fb.group({
    email: '',
    password: '',
  });

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: '',
      password: '',
    });
  }

  loguearse() {    
    let userInfo: IUserInfo = Object.assign({}, this.formGroup.value);
    localStorage.setItem('usuario', userInfo.email);
    this.accountService.login(userInfo).subscribe(token => {this.recibirToken(token), 
      this.router.navigate(['/tarjeta']), this.toastr.success('Usuario logueado!', 'Bienvenido!')},
      error => this.toastr.error('Los datos del usuario son incorrectos!','Datos incorrectos!'));
  }

  registrarse() {
    let userInfo: IUserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.create(userInfo).subscribe(token => {this.recibirToken(token), this.formGroup.reset(),this.router.navigate(['/register-login']),
    this.toastr.success('El usuario fue registrado exitosamente!', 'Usuario registrado!')},
      error => this.manejarError(error));
  }

  recibirToken(token: any) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);    
    this.router.navigate([""]);
  }

  manejarError(error: any) {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }

}