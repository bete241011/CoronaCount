import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'prefix',
})
export class PrefixPipe implements PipeTransform {

  transform(value: string, ...args) {
    const num = parseFloat(value.replace(/,/g, ''));
    return num > 0 ? `+ ${value}` : num
  }
}
