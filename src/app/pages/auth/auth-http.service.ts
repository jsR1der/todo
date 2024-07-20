import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoginPayload, SignUpInResponse, SignUpPayload, User} from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private readonly baseUrl = 'http://localhost:3000'
  public token: string;
  public user: User;

  constructor(private readonly httpClient: HttpClient) {
  }

  public signIn(body: LoginPayload): Observable<SignUpInResponse> {
    return this.httpClient.post<SignUpInResponse>(`${this.baseUrl}/auth/signIn`, body).pipe(tap(res => {
      this.token = res.token
      this.user = res.user
    }))
  }

  public signUp(body: SignUpPayload): Observable<SignUpInResponse> {
    return this.httpClient.post<SignUpInResponse>(`${this.baseUrl}/auth/signUp`, body).pipe(tap(res => {
      this.token = res.token
      this.user = res.user
    }))
  }

  public signOut(): Observable<SignUpInResponse> {
    return this.httpClient.get<SignUpInResponse>(`${this.baseUrl}/auth/signOut`)
  }
}
