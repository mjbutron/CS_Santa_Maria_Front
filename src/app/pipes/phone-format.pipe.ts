import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(null != value){
      var splitted = value.toString().split('');
      return splitted[0]+splitted[1]+splitted[2]+" - "
      +splitted[3]+splitted[4]+splitted[5]+" - "
      +splitted[6]+splitted[7]+splitted[8];
    }
    else{
      return "";
    }
  }
}
