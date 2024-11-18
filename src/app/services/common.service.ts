

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class commonService {
  // private userSubject: BehaviorSubject<''> | undefined;
  // public user: Observable<''> | undefined;
  _isAcriveUser = new BehaviorSubject('');
  constructor(private http: HttpClient) { }

  getService(url: any, params: any) {
    return this.http.get(url, {
      params: params
    });
  }

  getDeptDashboard(url: any, params: any) {
    return this.http.get(url + params);
  }
  
  getDataService(url: any, params: any) {
    return this.http.post(url,  params);
  }

  getHierarchyService(url: any, params: any) {
    return this.http.post(url,  params);
  }

  getButtonDetails(url: any, params: any) {
    return this.http.get(url +  params);
  }

  getFileService(url: any, params: any) {
    return this.http.post(url,  params);
  }

  getSupportiveDoc(url: any, params: any) {
    return this.http.post(url,  params);
  }

  getSecondViewDetails(url: any, params: any) {
    return this.http.post(url,  params);
  }
  


  postService(url: any, data: any) {
    return this.http.post(url, data);
  }

  // In commonService
getDeptDashboards(endpoint: string, payload: any) {
  return this.http.post(endpoint, payload);  // The payload is passed in the body, not in the URL
}
  
}
