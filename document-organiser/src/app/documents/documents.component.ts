import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
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
  user: any = null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = this.user?.role === 'User' ? ['name', 'doctype', 'expires_at',] : ['id', 'name', 'doctype', 'expires_at', 'owner',];

  constructor(
    private documentsService: DocumentsService,
    private overlay: Overlay,
    private authService: AuthService
  ) {
    this.dataSource = new DocumentsDataSource();
    this.documentsService.getDocuments().subscribe((res) => {
      if (res.success) {
        this.dataSource.data = this.processData(res.data);
        this.table.dataSource = this.dataSource;
      }
    })
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.displayedColumns = this.user?.role === 'User' ? ['name', 'doctype', 'expires_at', 'download'] : ['id', 'name', 'doctype', 'expires_at', 'owner', 'download'];
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

    const componentRef = overlayRef.attach(new ComponentPortal(DocumentDetailsComponent));

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

  public downloadBtn(event: any, row: any) {
    console.log(row.download);
    this.documentsService.downloadDocument(row.id, row.download.location).subscribe(data => {
      let fileName: string = row.name.toLowerCase();
      fileName = fileName.replace(/\W/g, '')
      console.log(fileName);
      let blob: Blob = data.body as Blob;
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      link.click();
    });
    event.stopPropagation();
  }

  private processData(data: any[]): any[] {
    let result: { id: any; name: any; doctype: any; expires_at: any; owner: any; }[] = [];
    data.forEach(element => {
      let temp = {
        id: element._id,
        name: element.name,
        doctype: element.doctype ? element.doctype.name : 'Legacy type - not supported',
        expires_at: new Date(element.expires_at),
        owner: element.owner.name,
        doctypeId: element.doctype ? element.doctype._id : '-1',
        details: element.details,
        download: element.currentfile,
        oldfiles: element.oldfiles,
        upgrade: element.upgrade
      }
      result.push(temp);
    });
    return result;
  }
}
