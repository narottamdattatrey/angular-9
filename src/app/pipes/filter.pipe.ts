import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, key: any[]): any {
        return value.filter(x => (x.name === key || x.mobile === key))
    }
}