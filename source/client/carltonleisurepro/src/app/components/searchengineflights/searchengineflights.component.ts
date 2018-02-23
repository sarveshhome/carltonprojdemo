import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchengineflights',
  templateUrl: './searchengineflights.component.html',
  styleUrls: ['./searchengineflights.component.css']
})
export class SearchengineflightsComponent implements OnInit {

  constructor() {
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("myList").style.display = "block";

    });

   }

  ngOnInit() {
  }

}
