import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private email$ = new BehaviorSubject<string>("");
  private name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }
  public getNameFromStore(){
    return this.name$.asObservable();
  }

  public setNameForStore(name:string) {
    this.name$.next(name);
  }

  public getEmailFromStore(){
    return this.email$.asObservable();
  }

  public setEmailForStore(email:string) {
    this.email$.next(email);
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string) {
    this.role$.next(role);
  }
}
