import {Component, inject} from '@angular/core';
import {UserRequests} from '../../../service/http-requests/user-requests';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../../model/user/User';
import {Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'register',
  imports: [
    InputText,
    FloatLabel,
    ReactiveFormsModule,
    Button,
    Card
  ],
  templateUrl: './register.html',
})
export class Register {
  private readonly userRequests = inject(UserRequests);
  private readonly router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  async register() {
    const {firstName, lastName, email, password} = this.registerForm.value;
    const user: User = {...new User(), firstName, lastName, email, password};
    try {
      await this.userRequests.register(user);
      this.router.navigate(['/login'])
    } catch (e) {
      // TODO: show error message
      console.log(e);
    }

  }

}
