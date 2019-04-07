import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HardwareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
