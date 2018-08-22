import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';

@Component({
    selector: 'pagination',
    templateUrl: './sw-pagination.template.html',
    styleUrls: ['./sw-pagination.scss']
})

export class PaginationComponent {
    @Input() wholeList = [];
    @Input() list = [];
    @Output() pageChanged = new EventEmitter<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() pageSize = 25;
    pageIndex = 0;
    @Input() pageSizeOptions = [25, 50, 75, 100];

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.resetData();
    }

    resetData() {
        let start = this.pageSize * this.pageIndex;
        let end = start + this.pageSize;
        if (end > this.wholeList.length) {
            end = this.wholeList.length;
        }

        this.list = [];
        for (let i = start; i < end; i++) {
            this.list.push(this.wholeList[i]);
        }
        this.pageChanged.emit(this.list);
    }

    filterData(list) {
        this.wholeList = list;
        this.pageIndex = this.paginator.pageIndex = 0;
        this.resetData();
    }
}
