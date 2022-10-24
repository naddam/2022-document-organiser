import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentsDataSource, DocumentsItem } from './documents-datasource';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DocumentsItem>;
  dataSource: DocumentsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'doctype', 'expires_at', 'owner',];

  constructor(
    private documentsService: DocumentsService,
    private overlay: Overlay
  ) {
    this.dataSource = new DocumentsDataSource();
    this.documentsService.getDocuments().subscribe((res) => {
      if (res.success) {
        this.dataSource.data = this.processData(res.data);
        this.table.dataSource = this.dataSource;
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getRecord(row: any){
    console.log(row);
    //this.openDetailsOverlay();
  }

  public openDetailsOverlay(){
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true
    });

    const componentRef = overlayRef.attach(new ComponentPortal(DocumentDetailsComponent));

    overlayRef.backdropClick()
      .subscribe(() => {
        overlayRef.detach();
        overlayRef.dispose();
      });
  }

  private processData(data: any[]): any[] {
    let result: { id: any; name: any; doctype: any; expires_at: any; owner: any; }[] = [];
    data.forEach(element => {
      let temp = {
        id: element._id,
        name: element.name,
        doctype: element.doctype.name,
        expires_at: new Date(element.expires_at),
        owner: element.owner.name
      }
      result.push(temp);
    });
    return result;
  }
}
