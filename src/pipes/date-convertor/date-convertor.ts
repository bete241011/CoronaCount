import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
@Pipe({
  name: 'dateConvertor',
})
export class DateConvertorPipe implements PipeTransform {
  transform(value: string, ...args) {
    return moment(value).fromNow();
  }
}
