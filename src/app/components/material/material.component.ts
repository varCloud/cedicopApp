import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent implements OnInit {

  @Input('material') material : any ;
  constructor() { }

  ngOnInit() {}

}
