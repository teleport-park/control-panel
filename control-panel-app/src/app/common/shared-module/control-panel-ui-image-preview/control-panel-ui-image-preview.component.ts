import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'control-panel-ui-image-preview',
  templateUrl: './control-panel-ui-image-preview.component.html',
  styleUrls: ['./control-panel-ui-image-preview.component.scss']
})
export class ControlPanelUiImagePreviewComponent implements OnInit {

  backgroundUrl: SafeUrl;

  @Input() url = '';

  @Input() prefix = '';

  @Input() resolution: '.png' | '.jpeg' = '.png';

  constructor() {
  }

  ngOnInit() {
    this.backgroundUrl = this.prefix + this.url + this.resolution;
  }

}
