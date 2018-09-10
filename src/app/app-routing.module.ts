import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TeamComponent } from "./team/team.component";
import { GroupComponent } from "./group/group.component";
import { MatchComponent } from "./match/match.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "team/:groupId/details/:teamName", component: TeamComponent },
  { path: "group/:groupId", component: GroupComponent },
  { path: "match/:matchId/group/:groupId", component: MatchComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
