import { SimpleChanges, Directive, ElementRef, AfterViewChecked, Input, Output, EventEmitter, OnInit } from '@angular/core';

import * as moment from 'moment/moment';
import * as jquery from 'jquery/dist/jquery';
import 'bootstrap-material-design/dist/js/ripples.min';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js';
import 'bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css';

@Directive({
    selector: '[datepicker],[datetimepicker],[timepicker]',
})
export class DatePickerDirective {

    constructor(
        private elementRef: ElementRef,
    ) {
        this.el = this.elementRef.nativeElement;
        this.dtpLocale = moment().locale() || this.dtpLocale;
    }

    private el: HTMLInputElement;
   
    @Input()
    dtpFormat = 'L LT';
    
    @Input()
    dtpLocale = null;

    @Input()
    dtpTime = true;

    @Input()
    dtpDate = true;
    
    @Input()
    public set datetimepicker(s: string) { 
        this.dtpDate = true; 
        this.dtpTime = true; 
        this.dtpFormat = 'L LT';
    }
    @Input()
    public set datepicker(s: string) { 
        this.dtpDate = true; 
        this.dtpTime = false;
        this.dtpFormat = 'L';
    }
    @Input()
    public set timepicker(s: string) { 
        this.dtpDate = false; 
        this.dtpTime = true; 
        this.dtpFormat = 'LT';
    }
    @Input()
    public set date(d: Date) {
        this.el.value = moment(new Date(d)).format(this.dtpFormat);
    }

    @Output()
    dateChange: EventEmitter<any> = new EventEmitter()
    
    ngOnInit() {
        let $element = jquery(this.elementRef.nativeElement);
        $element.bootstrapMaterialDatePicker({
            date: this.dtpDate,
            time: this.dtpTime,
            format: this.dtpFormat,
            lang: this.dtpFormat,
        });
        
        $element.on('change',()=> {
            this.dateChange.emit(moment($element.val(), this.dtpFormat).toDate());
        })
    };
}
