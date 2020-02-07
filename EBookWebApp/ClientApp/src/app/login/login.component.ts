import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServicesService } from '../shared/services/authentication-services.service'
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _authenticationServicesService: AuthenticationServicesService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });



  }


  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;

    this._authenticationServicesService.login(formValue.username, formValue.password)
      .pipe(first())
      .subscribe(
        data => {
          debugger;
          localStorage.setItem('currentUserName', formValue.username);
          this.router.navigateByUrl('/bookdetails');

        },
        error => {

          this.ShowSuccess('Invalid login', 'Login');

          console.warn('error');

        });
  }

  ShowSuccess(bodytext: string, headertext: string) {
    this.toastr.success(bodytext, headertext);
  }








}
