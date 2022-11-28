import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TypesService } from '../types.service';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.scss']
})
export class TypeDetailsComponent implements OnInit {
  docForm = this.fb.group({
    name: [null, Validators.required],
    details: this.fb.array([])
  });

  @Input()
  docIn: any = null;
  editMode: boolean = false;
  keyTypes = ['String', 'Number', 'Date'];

  @Output()
  newItemEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private typesService: TypesService,
    private datePipe: DatePipe
  ) {
  }
  ngOnInit(): void {
    if (this.docIn) {
      console.log('Edit mode', this.docIn)
      this.editMode = true;
      this.docForm = this.fb.group({
        name: [this.docIn.name, Validators.required],
        details: this.fb.array([])
      });
      this.docIn.details.forEach((element: any) => {
        const detail = this.fb.group({
          key: [element.key, Validators.required],
          keyType: [element.keyType, Validators.required]
        });
        console.log(detail);
        this.details.push(detail);
      });

    }

  }

  get details() {
    return this.docForm.controls["details"] as FormArray;
  }

  addDetail() {
    const detailForm = this.fb.group({
      key: ['', Validators.required],
      keyType: ['String', Validators.required]
    });
    this.details.push(detailForm);
  }

  deleteDetail(detailIndex: number) {
    this.details.removeAt(detailIndex);
  }

  onSubmit(): void {

    const formData = new FormData();
    formData.append("name", this.docForm.value.name);
    formData.append("details", JSON.stringify(this.docForm.value.details));
    if (!this.editMode) {
      this.typesService.newType(formData).subscribe((res) => {
        console.log(res);
        this.newItemEvent.emit();
      })
    }
    else {
      this.typesService.patchType(formData, this.docIn.id).subscribe((res) => {
        console.log(res);
        this.newItemEvent.emit();
      })
    }
  }

  onDelete() {
    this.typesService.deleteType(this.docIn.id).subscribe(() => {
      this.newItemEvent.emit();
    });
  }
}
