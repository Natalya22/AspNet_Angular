import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { License } from '../models/license';

@Injectable()
export class LicenseService {
 
    private url = "/api/licenses";
 
    constructor(private http: HttpClient) {
    }
    
    getLicenses() {
        return this.http.get(this.url);
    }
     
    getLicense(id: number) {
        return this.http.get(this.url + '/' + id);
    }
     
    createLicense(license: License) {
        return this.http.post(this.url, license);
    }

    updateLicense(license: License) {
  
        return this.http.put(this.url, license);
    }
    
    deleteLicense(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}