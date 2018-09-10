import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
  baseUrl = "http://api.varzesh3.com/v2.0/leaguestat/widget/5/";
  newsUrl = "http://api.varzesh3.com/v2.0/search?q=";
  matchUrl = "http://api.varzesh3.com/v0.2/match/events/";

  constructor(private http: HttpClient) {}

  getGroup(groupId: number) {
    return this.http.get(this.baseUrl + groupId);
  }

  getTeam(matchId: number) {
    return this.http.get(this.baseUrl + matchId);
  }

  getNews(newsText: string) {
    return this.http.get(this.newsUrl + newsText);
  }
  getMatch(matchId: number) {
    return this.http.get(this.matchUrl + matchId);
  }
}
