import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Location } from "@angular/common";
import { TitleService } from "../services/title.service";
import { RedirectService } from "../services/redirect.service";
@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  groupId: number;
  isLoading: boolean = true;
  groupData;
  finalGroupData;
  firstItem: number = 0;
  lastItem: number = 3;
  nextBtn: boolean = true;
  prevBtn: boolean = false;
  groupTitle: string;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private titleService: TitleService,
    private redirect: RedirectService
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params["groupId"];

    //chek for number
    if (isNaN(this.groupId)) {
      this.redirect.notFound();
    } else {
      this.apiService.getGroup(this.groupId).subscribe(response => {
        this.isLoading = false;
        this.groupData = response;

        if (this.groupData != null) {
          for (let i of this.groupData.Fixtures) {
            for (let j of this.groupData.Table) {
              if (i.Host == j.Team) {
                i.HostLogoHQ = j.FlagHQ;
                break;
              }
            }
            for (let j of this.groupData.Table) {
              if (i.Guest == j.Team) {
                i.GuestLogoHQ = j.FlagHQ;
                break;
              }
            }
          }

          this.groupTitle = this.groupData.Widget.Title;
          this.finalGroupData = this.groupData.Fixtures;

          this.titleService.setPageTitle("بازی‌های " + this.groupTitle);
        } else {
          this.redirect.notFound();
        }
      });
    }
  }

  cancel() {
    this.location.back(); // go back to previous location on cancel
  }

  nextPage() {
    this.firstItem = 3;
    this.lastItem = 7;
    this.nextBtn = false;
    this.prevBtn = true;
  }

  prevPage() {
    this.firstItem = 0;
    this.lastItem = 3;
    this.nextBtn = true;
    this.prevBtn = false;
  }
}
