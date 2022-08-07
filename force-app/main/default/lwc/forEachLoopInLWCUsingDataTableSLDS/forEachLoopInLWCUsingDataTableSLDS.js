import { LightningElement } from 'lwc';

export default class ForEachLoopInLWCUsingDataTableSLDS extends LightningElement {
    students = [
        {
            Id : '107',
            Name : 'Murali',
            Location : 'pamidipadu'
        },
        {
            Id : '117',
            Name : 'Gunturi Srinivas',
            Location : 'Guntur'
        },
        {
            Id : '105',
            Name : 'Akash',
            Location : 'Mangalagiri'
        },
        {
            Id : '135',
            Name : 'Naveen',
            Location : 'Guntur'
        },
    ];
}