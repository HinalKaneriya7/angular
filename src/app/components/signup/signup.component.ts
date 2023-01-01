import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type:string ="password";
  isText:boolean =false;
  eyeIcon:string = "fa-eye-slash";
  signUpForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      role:['',Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type= "password";
  }

  onSignup() {
    if(this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }else {
      ValidateForm.validateAllFormField(this.signUpForm);
      alert("form is invalid");
    }
  }

  

}
