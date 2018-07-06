import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usmap',
  templateUrl: './usmap.component.html',
  styleUrls: ['./usmap.component.scss']
})
export class UsmapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showLabel(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let id: string = target.attributes.id.nodeValue;
    let location: string = id.substring(0, id.indexOf('-marker'));
    document.getElementById(location.concat('-label')).setAttribute('visibility', 'visible');
  }
  hideLabel(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let id: string = target.attributes.id.nodeValue;
    let location: string = id.substring(0, id.indexOf('-marker'));
    document.getElementById(location.concat('-label')).setAttribute('visibility', 'hidden');
  }

}
