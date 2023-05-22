import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { UsersService } from './user.service';

// TODO: Replace this with your own data model type
export interface TableItem {
  nome: string;
  codigo: number;
  sexo: string;
}
function getTable() {
  
  let tabel = [{ codigo: 0, nome: " ", sexo: " " }]
  return tabel
}

let table: TableItem[] = getTable()
// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = table
// [
//   {codigo: 1, nome: 'Hydrogen', sexo: 'F'},
//   {codigo: 2, nome: 'Helium', sexo: 'F'},
//   {codigo: 3, nome: 'Lithium', sexo: 'F'},
//   {codigo: 4, nome: 'Beryllium', sexo: 'F'},
//   {codigo: 5, nome: 'Boron', sexo: 'F'},
//   {codigo: 6, nome: 'Carbon', sexo: 'F'},
//   {codigo: 7, nome: 'Nitrogen', sexo: 'F'},
//   {codigo: 8, nome: 'Oxygen', sexo: 'F'},
//   {codigo: 9, nome: 'Fluorine', sexo: 'F'},
//   {codigo: 10, nome: 'Neon', sexo: 'F'},
//   {codigo: 11, nome: 'Sodium', sexo: 'F'},
//   {codigo: 12, nome: 'Magnesium', sexo: 'F'},
//   {codigo: 13, nome: 'Aluminum', sexo: 'F'},
//   {codigo: 14, nome: 'Silicon', sexo: 'F'},
//   {codigo: 15, nome: 'Phosphorus', sexo: 'F'},
//   {codigo: 16, nome: 'Sulfur', sexo: 'F'},
//   {codigo: 17, nome: 'Chlorine', sexo: 'F'},
//   {codigo: 18, nome: 'Argon', sexo: 'F'},
//   {codigo: 19, nome: 'Potassium', sexo: 'F'},
//   {codigo: 20, nome: 'Calcium', sexo: 'F'},
// ]


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]): TableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]): TableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'codigo': return compare(+a.codigo, +b.codigo, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
