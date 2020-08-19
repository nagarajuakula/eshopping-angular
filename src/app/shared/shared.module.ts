import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilter } from './pipes/search-filter.pipe';
import { SearchByCategoryPipe } from './pipes/searchByCategory.pipe';

@NgModule({
    imports: [ CommonModule ],
    declarations: [  SearchFilter, SearchByCategoryPipe],
    exports: [ SearchFilter, SearchByCategoryPipe ]
})
export class SharedModule {

}