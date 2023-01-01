import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type:string ="password";
  isText:boolean =false;
  eyeIcon:string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private formbuilder : FormBuilder,private auth:AuthService,private router:Router,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type= "password";
  }

  onLogin() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setNameForStore(tokenPayload.name);
          this.userStore.setEmailForStore(tokenPayload.email);
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else {
      ValidateForm.validateAllFormField(this.loginForm);
      alert("your form is invalid")
    }
  }


}
