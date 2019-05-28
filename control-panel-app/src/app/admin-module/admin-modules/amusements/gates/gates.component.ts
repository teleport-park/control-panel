import { Component, OnInit } from '@angular/core';
import { HardwareService } from '../hardware/services/hardware.service';

@Component({
  selector: 'gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.scss']
})
export class GatesComponent implements OnInit {

  constructor(public service: HardwareService) { }

  ngOnInit() {
  }

}
