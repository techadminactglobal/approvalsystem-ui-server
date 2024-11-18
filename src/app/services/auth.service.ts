import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { commonService } from './common.service';
import { API_PATH } from 'src/environments/api-constant';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  queryWithLangChainGPT4(query: any, prompt: string, uuid_number: (query: any, prompt: string, uuid_number: any) => void) {
    throw new Error('Method not implemented.');
  }
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  // private _isAcriveUser = new BehaviorSubject('');

  private _isMCDEmployee = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();
  isMCDEmployee = this._isMCDEmployee.asObservable();
  constructor(private http: HttpClient,private service: commonService) {
    
    const userData: any = JSON.parse(localStorage.getItem('userData') || "{}");
    this._isLoggedIn.next(!!Object.keys(userData).length)
  }
  
  getLoginDetail(request:any): Observable<any>{
    return this.http.post(API_PATH.LOGIN_API, request);
    // return this.http.get(`${API_PATH.LOGIN_API}${request}`);
  }

  getForgotDetail(request:any): Observable<any>{
    return this.http.post(API_PATH.FORGOT_API, request);
  }

  getSaveDetails(request:any):Observable<any>{
    return this.http.post(API_PATH.SAVE_API,request);
  }

  getIsUserDetails(request:any){
    return this.http.post(API_PATH.GET_USER_DETAIL,request);
  }

  getApplicantDetails(request:any){
    return this.http.post(API_PATH.form_Data,request);
  }



  




  // login(request: any) {
  //   console.log("----------in auth service request-----------:,", request);
  //   return this.service.postService(API_PATH.LOGIN_API, request).pipe(
  //     tap((response: any) => {
  //       if (!response.mcdApplicationUser) {          
  //         return
  //       }
  //       this._isLoggedIn.next(true);
  //       console.log("this._isLoggedIn", this._isLoggedIn)
  //       this._isMCDEmployee.next(!isNaN(parseFloat(response?.mcdApplicationUser?.biometricId)));
  //       localStorage.setItem('userData', JSON.stringify(response))

  //       console.log("login role", response.role)
  //       let decoded:any = jwt_decode(response.jwtToken);
  //       this.service._isAcriveUser.next(decoded.sub);
  //       // let strTime=decoded.exp;
  //       // let expTime=decoded.exp;
  //       // console.log("time convert",decoded.sub)
  //       // this._isAcriveUser=decoded.sub;
  //       // let minitus=Math.floor(diff / 1000 / 60);
  //       // console.log("decoded",expTime);
        
  //       // var jwt = nJwt.create({ id: user.id }, config.secret);
  //       // jwt.setExpiration(new Date().getTime() + (24*60*60*1000));
  //     })
  //   )
  // }
}
