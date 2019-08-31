import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlsService } from '../../../services/api-urls.service';

@Injectable()

export class TeleportVrService {

  constructor(private http: HttpClient, private apiService: ApiUrlsService) {}

  getTVRInstances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiService.getTVRUrl('GET'));
  }
}
