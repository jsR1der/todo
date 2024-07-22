import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LoginPayload, SignUpInResponse, SignUpPayload, User} from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private readonly baseUrl = 'http://localhost:3000'
  public user$ = new BehaviorSubject<User | null>(this.getEntityFromLocalStorage<User>('user'));
  public token$ = new BehaviorSubject<string | null>(this.getEntityFromLocalStorage<string>('token'));

  constructor(private readonly httpClient: HttpClient) {
  }


  private getEntityFromLocalStorage<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value === null) {
      return value;
    }
    return JSON.parse(value);
  }

  private setEntityToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public signIn(body: LoginPayload): Observable<SignUpInResponse> {
    return this.httpClient.post<SignUpInResponse>(`${this.baseUrl}/auth/signIn`, body).pipe(tap(res => {
      this.setAuthState(res)
    }))
  }

  public signUp(body: SignUpPayload): Observable<SignUpInResponse> {
    return this.httpClient.post<SignUpInResponse>(`${this.baseUrl}/auth/signUp`, body).pipe(tap(res => {
      this.setAuthState(res)
    }))
  }

  public signOut(): Observable<SignUpInResponse> {
    return this.httpClient.get<SignUpInResponse>(`${this.baseUrl}/auth/signOut`)
  }

  private setAuthState(res: SignUpInResponse): void {
    this.token$.next(res.token)
    this.user$.next(res.user)
    this.setEntityToLocalStorage('user', res.user)
    this.setEntityToLocalStorage('token', res.token)
  }

  public clearAuthState(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user$.next(null)
    this.token$.next(null)
  }
}
