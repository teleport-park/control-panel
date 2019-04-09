import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HardwareItem } from '../../../../common/shared-module/control-panel-ui-hardware-item/control-panel-ui-hardware-item';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HardwareService {

  items$: BehaviorSubject<HardwareItem[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getItems();
  }

  getItems(): void {
    this.http.get<HardwareItem[]>('./assets/data/hardware_items.json')
      .subscribe((data: HardwareItem[]) => {
        this.items$.next(data);
      });
  }
}
