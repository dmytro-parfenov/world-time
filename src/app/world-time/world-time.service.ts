import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeZone} from './time-zone';

@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {

  private readonly resource = 'http://worldtimeapi.org/api';

  constructor(private readonly http: HttpClient) { }

  list() {
    return this.http.get<string[]>(`${this.resource}/timezone`);
  }

  timeByIanaZone(iana = Intl.DateTimeFormat().resolvedOptions().timeZone) {
    return this.http.get<TimeZone>(`${this.resource}/timezone/${iana}`);
  }
}
