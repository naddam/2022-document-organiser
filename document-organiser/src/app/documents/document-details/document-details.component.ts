import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DoctypesService } from 'src/app/doctypes/doctypes.service';
import { DocumentsService } from '../documents.service';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  docForm = this.fb.group({
    name: [null, Validators.required],
    expires_at: [null, Validators.required],
    doctype: [null, Validators.required],
  });

  @Input()
  docIn: any = null;
  editMode: boolean = false;
  detailsForm = this.fb.group({});
  details: any[] = [];
  file: File | undefined;

  @Output()
  newItemEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private doctypesService: DoctypesService,
    private documentsService: DocumentsService,
    private datePipe: DatePipe
  ) {
    this.doctypesService.getTypes().subscribe(res => {
      if (res.success) {
        this.doctypes = res.data;
      }
    })
  }
  ngOnInit(): void {
    if (this.docIn) {
      console.log('Edit mode', this.docIn)
      this.editMode = true;
      let tempDate = new Date(this.docIn.expires_at);
      this.docForm = this.fb.group({
        name: [this.docIn.name, Validators.required],
        expires_at: [this.datePipe.transform(tempDate, 'yyyy-MM-dd'), Validators.required],
        doctype: [{ value: this.docIn.doctypeId, disabled: true }, Validators.required],
      });
      this.detailsForm = this.fb.group({});
      this.details = this.docIn.details;

      this.docIn.details.forEach((element: any, idx: number) => {
        let val = element.value
        if (element.keyType === 'Date') {
          let tempDate = new Date(element.value);
          val = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
        }
        this.detailsForm.addControl(idx.toString(), new FormControl(val, Validators.required))
      });

    }

  }

  doctypes: { _id: string, name: string, details: any[] }[] = []

  onSubmit(): void {
    let det: any[] = [];
    this.details.forEach((element, idx) => {
      det.push({ key: element.key, keyType: element.keyType, value: this.detailsForm.value[`${idx}`] })
    });
    const formData = new FormData();
    formData.append("filedata", this.file!);
    formData.append("name", this.docForm.value.name);
    formData.append("_doctype", this.docForm.value.doctype);
    formData.append("expires_at", (new Date(this.docForm.value.expires_at)).toUTCString());
    formData.append("details", JSON.stringify(det));
    formData.append("id", this.editMode ? this.docIn.id : undefined);

    /*let document = {
      name: this.docForm.value.name,
      _doctype: this.docForm.value.doctype,
      expires_at: (new Date(this.docForm.value.expires_at)).toUTCString(),
      details: det,
      id: this.editMode ? this.docIn.id : undefined
    }*/
    //console.log(document)
    if (!this.editMode) {
      this.documentsService.newDocument(formData).subscribe((res) => {
        console.log(res);
        this.newItemEvent.emit();
      })
    }
    else {
      this.documentsService.patchDocument(formData, this.docIn.id).subscribe((res) => {
        console.log(res);
        this.newItemEvent.emit();
      })
    }
  }

  selCh(event: any) {
    let doctype = this.doctypes.find(element => element._id === event.source._value);
    if (doctype?.details) {
      this.buildDetailsForm(doctype.details);
    }
  }

  buildDetailsForm(details: any[]) {
    this.detailsForm = this.fb.group({});
    this.details = details;
    if (this.doctypes.length !== 0) {
      details.forEach((element, idx) => {
        console.log('[' + idx + ']' + element.key, ' : ', element.keyType);
        this.detailsForm.addControl(idx.toString(), new FormControl('', Validators.required))
      });
    }
  }

  public downloadBtn(event: any, file: any) {
    console.log(file);
    this.documentsService.downloadDocument(this.docIn.id, file.location).subscribe(data => {
      let fileName: string = this.docIn.name.toLowerCase();
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

  onDelete() {
    this.documentsService.deleteDocument(this.docIn.id).subscribe(() => {
      this.newItemEvent.emit();
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
