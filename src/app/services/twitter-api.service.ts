import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TwitterApiService {
  private endpoint = 'https://api.twitter.com/1.1/account/update_profile_image.json';
  private params: {
    image: string,
    include_entities: boolean,
    skip_status: boolean
  } = {
    image: '',
    include_entities: false,
    skip_status: true
  }

  constructor(
    private http: HttpClient
  ) {
  }

  async request() {
    return new Promise<any>((resolve) => {
      const header: HttpHeaders = new HttpHeaders();
      header.append('authorization', `Bearer ${environment.BEARER_TOKEN}`);
      header.append('Content-Type', 'application/json');
      const httpOptions = {
        withCredentials: true,
        headers: header
      }
      this.http.post(this.endpoint, this.params, httpOptions).subscribe((result) => {
        resolve(result);
      });
    })
  }
}
