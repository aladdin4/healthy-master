import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(textFields: any[], filter: string): any {
    let tempItems = [...textFields];
    tempItems = [];
    if (filter == "") {
      return textFields;
    }
    else {
      textFields.filter((item) => {
       
        Object.keys(item).forEach(key => {
          //if key is id , skip
          if (key === 'id') return;
          if (typeof item[key] === 'object') return;
          if (typeof item[key] === 'string' || 'number') {
            if (!item[key]) return;
            if (item[key].toString().toLowerCase().includes(filter.toLowerCase())) {
              if (tempItems.includes(item)) return;
              tempItems.push(item);
            }
          }
        })
      })
      return tempItems;
    }
  }
}
