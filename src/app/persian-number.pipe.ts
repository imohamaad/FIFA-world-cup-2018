import { Pipe, PipeTransform } from "@angular/core";
import { Persian } from "../persian";
@Pipe({
  name: "persianNumber"
})
export class PersianNumberPipe implements PipeTransform {
  transform(str: any, args?: any): any {
    if (str != null && str.toString().trim() !== "") {
      return Persian.englishToPersianNumber(str.toString()).toString();
    } else {
      return "";
    }
  }
}
