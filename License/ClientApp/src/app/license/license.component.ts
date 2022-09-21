import { Component, OnInit} from '@angular/core';
import { LicenseService } from '../shared/services/license.service'
import { License } from '../shared/models/license.model';
import { Period } from '../shared/enums/period';
import { SourceMap } from 'module';

@Component({
    selector: 'license',
    templateUrl: './license.component.html',
    providers: [LicenseService]
})
export class LicenseComponent implements OnInit {

    license: License = new License();
    licenses: License[] = [];
    tableMode: boolean = true;
    periods: any = ['hour', 'day', 'month']
    selected: any;

    constructor(private licenseService: LicenseService) {}

    getPeriod(license: License): string {
        if (license.period != null){
            switch (license.period){
                case Period.hour: return 'hour';
                case Period.day: return 'day';
                case Period.month: return 'month';
            }
        }
        else {
            return null;
        }
    }

    ngOnInit(): void {
        this.loadLicenses();
    }
    
    loadLicenses() {
        this.licenseService
        .getLicenses()
        .subscribe((data: License[]) => {
            this.licenses = data
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
}