export interface IMatch {
  Info: Info;
  Events: any[];
}

export interface Info {
  Id: number;
  HostId: number;
  GuestId: number;
  Time: string;
  JalaliDate: string;
  HostTeam: string;
  GuestTeam: string;
  HostPoint: number;
  GuestPoint: number;
  HostLogoHQ: string;
  GuestLogoHQ: string;
  Started: boolean;
  Final: boolean;
}
