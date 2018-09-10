import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api.service";
import { ITeamBoard } from "./team-board.interface";
import { Location } from "@angular/common";
import { filter } from "rxjs/operators";
import { TitleService } from "../services/title.service";
import { RedirectService } from "../services/redirect.service";
@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.css"]
})
export class TeamComponent implements OnInit {
  isLoading: boolean = true;
  mainLoading: boolean = true;
  newsLoading: boolean = true;
  teamData;
  groupId: number;
  teamName: string;
  source;
  newsData;
  chekInput;
  team: ITeamBoard = {
    MatchId: 0,
    HostPoint: 0,
    GuestPoint: 0,
    HostTeam: "",
    GuestTeam: "",
    Final: false,
    HostLogoHQ: "",
    GuestLogoHQ: "",
    JalaliDate: "",
    Time: "",
    newsTitle: "",
    newsText: ""
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private titleService: TitleService,
    private redirect: RedirectService
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params["groupId"];
    this.teamName = this.route.snapshot.params["teamName"];

    this.titleService.setPageTitle("بازی‌های تیم ملی " + this.teamName);

    if (isNaN(this.groupId)) {
      this.redirect.notFound();
    } else {
      this.apiService.getGroup(this.groupId).subscribe(response => {
        this.mainLoading = false;
        this.teamData = response;

        //chek data from Table
        if (this.teamData != null) {
          //filtered data by team
          this.chekInput = this.teamData.Table.filter(
            x => x.Team == this.teamName
          );

          //chek team data
          if (this.chekInput.length != 0) {
            this.source = this.teamData.Fixtures.filter(
              x => x.Host === this.teamName || x.Guest === this.teamName
            );

            for (let i of this.source) {
              for (let j of this.teamData.Table) {
                if (i.Host == j.Team) {
                  i.HostLogoHQ = j.FlagHQ;
                  break;
                }
              }
              for (let j of this.teamData.Table) {
                if (i.Guest == j.Team) {
                  i.GuestLogoHQ = j.FlagHQ;
                  break;
                }
              }
            }

            this.team.MatchId = this.source[0].Id;

            this.team.HostTeam = this.source[0].Host;
            this.team.HostPoint = this.source[0].HostPoint;
            this.team.HostLogoHQ = this.source[0].HostLogoHQ;

            this.team.GuestTeam = this.source[0].Guest;
            this.team.GuestPoint = this.source[0].GuestPoint;
            this.team.GuestLogoHQ = this.source[0].GuestLogoHQ;

            this.team.JalaliDate = this.source[0].JalaliDate;
            this.team.Time = this.source[0].Time;
            this.team.Final = !this.source[0].Final;
          } else {
            this.redirect.notFound();
          }
        } else {
          this.redirect.notFound();
        }
      });
    }

    this.apiService.getNews("تیم ملی " + this.teamName).subscribe(response => {
      this.newsData = response;
      this.newsLoading = false;

      this.team.newsTitle = this.newsData.News[0].Title;
      this.team.newsText = this.newsData.News[0].PlainText;
    });
  }
  cancel() {
    this.location.back(); // go back to previous location on cancel
  }
}
