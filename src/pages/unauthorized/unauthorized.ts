import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdalService } from 'ng2-adal/dist/core';

@Component({
    selector: 'app-unauthorized',
    templateUrl: 'unauthorized.html'
})

export class Unauthorized implements OnInit {

    public message: string;

    constructor(private adalService: AdalService, private location: Location) {
        this.message = 'Hello from UnauthorizedComponent';
    }

    ngOnInit(): void {
    }
    public logIn() {
        this.adalService.login();
    }
    goback() {
        this.location.back();
    }
}
