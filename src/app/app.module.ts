import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { TitleService } from "./services/title.service";
import { TeamComponent } from "./team/team.component";
import { HomeComponent } from "./home/home.component";
import { PersianNumberPipe } from "./persian-number.pipe";
import { CutTextPipe } from "./limit-text.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { GroupComponent } from "./group/group.component";
import { MatchComponent } from "./match/match.component";
import { StatusPipe } from "./match/status.pipe";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RedirectService } from "./services/redirect.service";

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    HomeComponent,
    PersianNumberPipe,
    CutTextPipe,
    GroupComponent,
    MatchComponent,
    StatusPipe,
    NotFoundComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [ApiService, TitleService, RedirectService],
  bootstrap: [AppComponent]
})
export class AppModule {}
