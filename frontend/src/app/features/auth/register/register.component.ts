import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { register } from "../../../core/store/auth/auth.actions"
import { selectAuthError, selectAuthLoading } from "../../../core/store/auth/auth.selectors"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen py-12 flex flex-col justify-center sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Or
          <a routerLink="/auth/login" class="font-medium text-blue-500 hover:text-blue-400">
            sign in to your existing account
          </a>
        </p>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-[#1c2128] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-700">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <div class="mt-1">
                <input id="firstName" name="firstName" type="text" formControlName="firstName" required 
                  class="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md 
                  shadow-sm placeholder-gray-500 bg-[#0d1117] text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your first name ">
              </div>
              <div *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched" 
                class="text-red-500 text-xs mt-1">
                First Name is required (min 3 characters)
              </div>
            </div>
          
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div class="mt-1">
                <input id="email" name="email" type="email" formControlName="email" required 
                  class="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md 
                  shadow-sm placeholder-gray-500 bg-[#0d1117] text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email">
              </div>
              <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" 
                class="text-red-500 text-xs mt-1">
                Please enter a valid email address
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div class="mt-1">
                <input id="password" name="password" type="password" formControlName="password" required 
                  class="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md 
                  shadow-sm placeholder-gray-500 bg-[#0d1117] text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Create a password">
              </div>
              <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" 
                class="text-red-500 text-xs mt-1">
                Password must be at least 6 characters
              </div>
            </div>
  
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div class="mt-1">
                <input id="confirmPassword" name="confirmPassword" type="password" formControlName="confirmPassword" required 
                  class="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md 
                  shadow-sm placeholder-gray-500 bg-[#0d1117] text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password">
              </div>
              <div *ngIf="registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched" 
                class="text-red-500 text-xs mt-1">
                Passwords do not match
              </div>
            </div>
  
            <div class="flex items-center">
              <input id="accept_terms" name="accept_terms" type="checkbox" formControlName="acceptTerms"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-[#0d1117]">
              <label for="accept_terms" class="ml-2 block text-sm text-gray-300">
                I accept the <a href="#" class="text-blue-500 hover:text-blue-400">Terms of Service</a> and 
                <a href="#" class="text-blue-500 hover:text-blue-400">Privacy Policy</a>
              </label>
            </div>
            <div *ngIf="registerForm.get('acceptTerms')?.invalid && registerForm.get('acceptTerms')?.touched" 
              class="text-red-500 text-xs -mt-4">
              You must accept the terms and conditions
            </div>
  
            <div *ngIf="error$ | async as error" 
              class="bg-red-900/50 text-red-300 p-3 rounded-md text-sm mb-4">
              {{ error }}
            </div>
  
            <div>
              <button type="submit" [disabled]="registerForm.invalid || (loading$ | async)"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed">
                <svg *ngIf="loading$ | async" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Create Account
              </button>
            </div>
          </form>
  
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-[#1c2128] text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
  
            <div class="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" 
                  class="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-md 
                  shadow-sm bg-[#161b22] text-sm font-medium text-gray-300 hover:bg-[#1c2128]">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
  
              <div>
                <a href="#" 
                  class="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-md 
                  shadow-sm bg-[#161b22] text-sm font-medium text-gray-300 hover:bg-[#1c2128]">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  registerForm: FormGroup
  loading$: Observable<boolean>
  error$: Observable<string | null>

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator },
    )

    this.loading$ = this.store.select(selectAuthLoading)
    this.error$ = this.store.select(selectAuthError)
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password")?.value
    const confirmPassword = form.get("confirmPassword")?.value
    return password === confirmPassword ? null : { passwordMismatch: true }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, email, password } = this.registerForm.value
      this.store.dispatch(register({ firstName, email, password }))
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}

