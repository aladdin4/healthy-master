import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDeletedPipe',
  standalone: true
})
export class FilterDeletedPipe implements PipeTransform {
  transform(items: any[]): any {
      return items.filter(item => !item.isDeleted);
  }
}
