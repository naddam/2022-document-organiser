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
        if(element.keyType === 'Date'){
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
    let document = {
      name: this.docForm.value.name,
      _doctype: this.docForm.value.doctype,
      expires_at: (new Date(this.docForm.value.expires_at)).toUTCString(),
      details: det,
      id: this.editMode ? this.docIn.id : undefined
    }
    console.log(document)
    if(!this.editMode){
      this.documentsService.newDocument(document).subscribe((res) => {
        console.log(res);
        this.newItemEvent.emit();
      })
    }
    else{
      this.documentsService.patchDocument(document).subscribe((res) => {
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

  onDelete(){
    this.documentsService.deleteDocument(this.docIn.id).subscribe(()=>{
      this.newItemEvent.emit();
    });
  }
}
