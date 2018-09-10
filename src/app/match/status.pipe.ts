import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "status"
})
export class StatusPipe implements PipeTransform {
  result: string;
  transform(status: number): any {
    if (status == 1) {
      this.result = "goal.png";
    }
    if (status == 2) {
      this.result = "yc.png";
    }
    if (status == 3) {
      this.result = "rc.png";
    }
    if (status == 4) {
      this.result = "2yc.png";
    }
    if (status == 5) {
      this.result = "missed-penalty.png";
    }
    if (status == 6) {
      this.result = "pg.png";
    }
    if (status == 7) {
      this.result = "og.png";
    }
    if (status == 9) {
      this.result = "subin.png";
    }
    if (status == 10) {
      this.result = "subout.png";
    }
    if (status == 11) {
      this.result = "assist.png";
    }

    return this.result;
  }
}
