import {Component, inject} from '@angular/core';
import {UserStore} from '../../../store/user-store';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {Message} from 'primeng/message';

@Component({
  selector: 'login',
  imports: [InputTextModule, ReactiveFormsModule, Button, RouterLink, Message],
  templateUrl: './login.html',
})
export class Login {
  private readonly userStore = inject(UserStore);
  protected loginError: boolean = false;

  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  login() {
    const { email, password } = this.loginForm.value;
    try {
      this.userStore.login(email, password);
      this.router.navigate(['dashboard'])
    } catch (e) {
      this.loginError = true;
    }
  }


}
