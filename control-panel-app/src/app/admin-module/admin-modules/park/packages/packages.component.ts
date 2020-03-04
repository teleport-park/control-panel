import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PackagesService } from './packages.service';

@Component({
   selector: 'packages',
   templateUrl: './packages.component.html',
   styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

   @ViewChild('formTemplate', {static: false}) formTemplate: TemplateRef<any>;

   displayedColumns: string[] = ['timestamp', 'status'];

   packagesColumns: string[] = [
      'title',
      'category',
      'cloudId',
      'description',
      'expiresAt',
      'games',
      'note',
      'syncId',
      'type',
      'coins',
      'price',
      'unlim'];

   simplePackagesColumns: string[] = ['title', 'category', 'cloudId', 'description', 'games', 'note', 'syncId', 'type', 'unlim'];

   _sliderValue: string = '00:00';


   constructor(public service: PackagesService,
               public cd: ChangeDetectorRef) {
   }

   ngOnInit() {
      this.service.getPackages();
   }


}
