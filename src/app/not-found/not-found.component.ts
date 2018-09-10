import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { TitleService } from "../services/title.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit {
  constructor(private location: Location, private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setPageTitle("متاسفیم!");
  }
  cancel() {
    this.location.back(); // go back to previous location on cancel
  }
}
