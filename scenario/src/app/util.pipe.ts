import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'timeFormat',
    standalone: true
})

export class TimeFormatPipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
        let myDate = new Date(value);
        return myDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }
    
}