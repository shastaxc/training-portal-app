import { Component, OnInit } from '@angular/core';
import * as data from '../../../../../assets/docs/instructors.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inst-detail',
  templateUrl: './inst-detail.component.html',
  styleUrls: ['./inst-detail.component.scss']
})
export class InstDetailComponent implements OnInit {

  title = 'Instructor Detail';
  instructors = <any>data;
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
  }
}
