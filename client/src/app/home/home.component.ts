import { MatDrawer } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer
  @ViewChild('projects') projects!: ElementRef

  toggle() {
    if (this.drawer.opened == true) {
      this.projects.nativeElement.style.gridTemplateColumns = '20vw 20vw 20vw 20vw 20vw'
    } else {
      this.projects.nativeElement.style.gridTemplateColumns = '20vw 20vw 20vw 20vw'
    }
    this.drawer.toggle();
    console.log(this.projects.nativeElement.style.gridTemplateColumns)


  }

  constructor() {}

  ngOnInit(): void {}
}
