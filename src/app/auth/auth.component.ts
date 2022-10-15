import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    @ViewChild('authForm') authForm: NgForm;
    isLoginMode = true;
    isLoading: boolean = false;
    errMsg: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError() {
        this.errMsg = null;
    }

    onSubmit() {
        if (!this.authForm.valid) {
            return;
        }

        const { email, password } = this.authForm.value;
        this.isLoading = true;
        this.errMsg = null;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            (resData) => {
                this.router.navigate(['/recipes']).finally(() => {
                    this.isLoading = false;
                });
                console.log(resData);
            },
            (err) => {
                this.isLoading = false;
                this.errMsg = err;
                this.showErrorAlert(this.errMsg);
                console.log(err);
            }
        );

        this.authForm.reset();
    }

    private showErrorAlert(message: string) {
        // const alertCmpFactory =
        const alertCmpFactory =
            this.componentFactoryResolver.resolveComponentFactory(
                AlertComponent
            );

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef =
            hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        componentRef.instance.close.pipe(take(1)).subscribe(() => {
            hostViewContainerRef.clear();
        });
    }
}
