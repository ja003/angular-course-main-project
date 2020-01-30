import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pipe, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;

  registered?: string;
}


@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0aps_Uh4nyboy5tOdZ1XIAjfoYPKM9yo",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => {
          let errorMessage = "Unknown error";
          if (!errorRes || !errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "Email already exists";
          }
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0aps_Uh4nyboy5tOdZ1XIAjfoYPKM9yo",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
