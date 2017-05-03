import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  /**  Created by Richard Asztalos
   *   Custom pipe to help capitalize the first and last name at the contact menu (component)
   */

  transform(value: any, args?: any): any {
     if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
  }

}
