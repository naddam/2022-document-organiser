import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
import { TypeDetailsComponent } from './type-details/type-details.component';
import { TypesDataSource, TypesItem } from './types-datasource';
import { TypesService } from './types.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TypesItem>;
  dataSource: TypesDataSource;
  user: any = null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = this.user?.role === 'User' ? ['name', 'doctype', 'expires_at',] : ['id', 'name', 'doctype', 'expires_at', 'owner',];

  constructor(
    private typesService: TypesService,
    private overlay: Overlay,
    private authService: AuthService
  ) {
    this.dataSource = new TypesDataSource();
    this.typesService.getTypes().subscribe((res) => {
      if (res.success) {
        this.dataSource.data = this.processData(res.data);
        this.table.dataSource = this.dataSource;
      }
    })
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.displayedColumns =  ['id', 'name'];
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getRecord(row: any) {
    //console.log(row);
    this.openDetailsOverlay(row);
  }

  public openDetailsOverlay(doc?: any) {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true
    });

    const componentRef = overlayRef.attach(new ComponentPortal(TypeDetailsComponent));

    if (doc) {
      componentRef.instance.docIn = doc;
    }

    componentRef.instance.newItemEvent.subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
      window.location.reload();
    })

    overlayRef.backdropClick()
      .subscribe(() => {
        overlayRef.detach();
        overlayRef.dispose();
      });
  }

  private processData(data: any[]): any[] {
    let result: { id: any; name: any; details: any[] }[] = [];
    data.forEach(element => {
      let temp = {
        id: element._id,
        name: element.name,
        details: element.details,
      }
      result.push(temp);
    });
    return result;
  }
}
