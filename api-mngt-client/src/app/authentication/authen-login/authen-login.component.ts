
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../guard/authentication.service';
import { AlertService } from '../alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../am/common/util/constants';
import { HeaderField } from '../../am/common/util/header-field';
import { HeaderValue } from '../../am/common/util/header-value';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './authen-login.component.html',
  styleUrls: ['./authen-login.component.css'],
  providers: [AuthenticationService, AlertService]
})

/**
 * Examine the handling of login requirements
 */
export class AuthenLoginComponent implements OnInit {

  private apiUrl = 'http://localhost:8080/user/me';

  constructor(private activatedRoute: ActivatedRoute, private http: Http,) {
    this.activatedRoute.queryParams.subscribe(params => {
          let token = params['token'];
          localStorage.setItem(Constants.ACCESS_TOKEN, token);
          console.log(token); // Print the parameter to the console. 
      });
  }

  ngOnInit() {
    // this.getUserInfo();
    
  }
//   getUserInfo(): Promise<any> {
//     debugger
//     let accessToken = this.getAccessToken();
//     var secureHeaders = new Headers();
//     secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
//     secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
//     var promise = this.http.get(this.apiUrl , { headers: secureHeaders })
//         .toPromise()
//       .then(response => {
//         response.json();
//         console.log(response.json)
//       })
//         .catch(error => {
//             console.log("error")
//         });
//     return promise;
// }
protected getAccessToken(): string {
  let accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
  return accessToken;
}
}