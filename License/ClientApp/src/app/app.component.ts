import { Component, OnInit} from '@angular/core';
import { LicenseService } from './services/license.service'
import { License } from './models/license';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [LicenseService]
})
export class AppComponent implements OnInit {

    license: License = new License();
    licenses: License[] = [];
    tableMode: boolean = true;

    constructor(private licenseService: LicenseService) {}

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
        .deleteLicense(license.id)
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
        for (i = 0; i < tr.length; i++) {
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