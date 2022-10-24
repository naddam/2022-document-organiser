import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent {
  docForm = this.fb.group({
    name: [null, Validators.required],
    expires_at: [null, Validators.required],
    doctype: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  doctypes = [
    {id: 1, name: 'haha' },
    {id: 2, name: 'hehe' }
  ]

  onSubmit(): void {
    console.log('Dun')
  }
}
