import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Location } from "@angular/common";
import { Info } from "./match.interface";

import { filter } from "rxjs/operators";
import { TitleService } from "../services/title.service";
import { RedirectService } from "../services/redirect.service";
@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.css"]
})
export class MatchComponent implements OnInit {
  matchId: number;
  matchData;
  isLoading: boolean = true;
  matchInfo: Info = {
    Id: 0,
    HostId: 0,
    GuestId: 0,
    Time: "",
    JalaliDate: "",
    HostTeam: "",
    GuestTeam: "",
    HostPoint: 0,
    GuestPoint: 0,
    HostLogoHQ: "",
    GuestLogoHQ: "",
    Started: false,
    Final: false
  };
  source;
  groupId;
  teamData;
  matchDate;
  matchLife;
  matchEvent: Event;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private titleService: TitleService,
    private redirect: RedirectService
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.params["matchId"];
    this.groupId = this.route.snapshot.params["groupId"];

    //chek for number
    if (isNaN(this.matchId) || isNaN(this.groupId)) {
      this.redirect.notFound();
    } else {
      this.apiService.getMatch(this.matchId).subscribe(response => {
        // this.mainLoading = false;
        this.matchData = response;

        if (this.matchData.Info != null) {
          this.matchEvent = this.matchData.Events;

          this.matchInfo.Time = this.matchData.Info.Time;
          this.matchInfo.Id = this.matchData.Info.Id;
          this.matchInfo.HostId = this.matchData.Info.HostId;
          this.matchInfo.GuestId = this.matchData.Info.GuestId;

          this.matchInfo.HostTeam = this.matchData.Info.HostTeam;
          this.matchInfo.GuestTeam = this.matchData.Info.GuestTeam;
          this.matchInfo.HostPoint = this.matchData.Info.HostPoint;
          this.matchInfo.GuestPoint = this.matchData.Info.GuestPoint;

          this.matchInfo.Started = this.matchData.Info.Started;
          this.matchInfo.Final = this.matchData.Info.Final;

          if (
            this.matchInfo.Final == false &&
            this.matchInfo.Started == false
          ) {
            this.matchLife = "بازی هنوز شروع نشده است";
          }
          if (this.matchInfo.Final == false && this.matchInfo.Started == true) {
            this.matchLife = "...بازی در حال برگزاری است";
          }
          if (this.matchInfo.Final == true && this.matchInfo.Started == true) {
            this.matchLife = "بازی به اتمام رسیده است";
          }

          this.titleService.setPageTitle(
            "جزئیات مسابقه " +
              this.matchInfo.HostTeam +
              " و " +
              this.matchInfo.GuestTeam
          );

          this.apiService.getGroup(this.groupId).subscribe(response => {
            this.teamData = response;

            if (this.teamData != null) {
              this.source = this.teamData.Table.filter(
                x =>
                  x.Team === this.matchInfo.HostTeam ||
                  x.Team === this.matchInfo.GuestTeam
              );

              this.matchDate = this.teamData.Fixtures.filter(
                x => x.Id === this.matchInfo.Id
              );

              // this.matchInfo.JalaliDate = this.matchDate.JalaliDate;
              this.matchInfo.JalaliDate = this.matchDate[0].JalaliDate;

              for (let i of this.source) {
                if (i.Team === this.matchInfo.HostTeam) {
                  this.matchInfo.HostLogoHQ = i.FlagHQ;
                }
                if (i.Team === this.matchInfo.GuestTeam) {
                  this.matchInfo.GuestLogoHQ = i.FlagHQ;
                }
              }
            } else {
              this.redirect.notFound();
            }
          });

          this.isLoading = false;
        } else {
          this.redirect.notFound();
        }
      });
    }
  }

  cancel() {
    this.location.back(); // go back to previous location on cancel
  }
}
