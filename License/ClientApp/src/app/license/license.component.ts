import { Component, OnInit} from '@angular/core';
import { LicenseService } from '../shared/services/license.service'
import { License } from '../shared/models/license.model';
import { Period } from '../shared/enums/period';
import { SourceMap } from 'module';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
    selector: 'license',
    templateUrl: './license.component.html',
    providers: [LicenseService]
})
export class LicenseComponent implements OnInit {

    license: License = new License();
    licenses: License[] = [];
    tableMode: boolean = true;
    selected: any;
    loading: boolean = true;
    periods: any = [
        {id: Period.hour, value: 'час'},
        {id: Period.day, value: 'день'},
        {id: Period.month, value: 'месяц'}
    ]

    constructor(private licenseService: LicenseService, private router: Router) {}

    getPeriod(license: License): string {
        return license?.period != null 
              ? this.periods.find(x => x.id === license.period).value
              : null;
    }

    ngOnInit(): void {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, {});
          });
        this.loadLicenses();
    }
    
    loadLicenses() {
        this.licenseService
        .getLicenses()
        .subscribe((data: License[]) => {
            this.licenses = data
            this.loading = false;
        });
    }

    save() {
        if (this.license.id == null) {
            this.licenseService
            .createLicense(this.license)
            .subscribe((data: License) => {
                this.licenses.push(data)
            });
        } else {
            this.licenseService
            .updateLicense(this.license)
            .subscribe(data => {
                this.loadLicenses()
            });
        }
        this.cancel();
    }

    editLicense(editedLicense: License) {
        this.license = editedLicense;
    }

    cancel() {
        this.license = new License();
        this.tableMode = true;
    }

    delete(license: License) {
        this.licenseService
        .deleteLicense(license.id!)
        .subscribe(data => this.loadLicenses());
    }

    add(){
        this.cancel();
        this.tableMode = false;
    }
    search(){
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("licenseTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                } else {
                tr[i].style.display = "none";
                }
            }
        }
    }
    onLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
    }
}