import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { TitleService } from "../services/title.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  postsArray: any = "";
  isLoading: boolean = true;
  isGroupLoading: boolean = false;
  groupId: number = 412;
  classId: number = 2;
  setGroupId: number = 412;

  constructor(
    private apiService: ApiService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle("برنامه بازی‌های جام‌جهانی");
    this.apiService.getGroup(412).subscribe(response => {
      this.isLoading = false;
      this.postsArray = response;
    });
  }

  sendGroupId(gId: number, classId: number) {
    this.isGroupLoading = true;
    this.apiService.getGroup(gId).subscribe(response => {
      this.isGroupLoading = false;
      this.postsArray = response;
      this.groupId = gId;
      this.classId = classId;
    });
  }
}
