import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-awb-view-modify',
  templateUrl: './awb-view-modify.component.html',
  styleUrls: ['./awb-view-modify.component.css']
})
export class AwbViewModifyComponent implements OnInit {
  form!: FormGroup;

  paymentModes = ['Cash', 'Credit', 'Debit'];
  shipmentModes = ['Air', 'Surface', 'Express'];
  serviceTypes = ['Normal', 'Priority', 'Express'];
  docTypes = ['DOCUME', 'NON-DOC'];
  currencies = ['INR', 'USD', 'EUR'];
  itemTypes = ['Document', 'Parcel', 'Sample'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      awbDateTime: [''],
      awbMode: ['manual'],
      awbNo: [''],
      paymentMode: [''],
      modeOfShipment: [''],
      freightCharge: [''],
      billingBranch: [''],
      billingClient: [''],
      destLocation: [''],
      serviceType: [''],
      docType: [''],

      shipperSearch: [''],
      shipperName: [''],
      shipperAddress: [''],
      shipperMobile: [''],
      shipperPin: [''],
      shipperCity: [''],
      shipperState: [''],
      shipperEmail: [''],

      consigneeSearch: [''],
      consigneeName: [''],
      consigneeAddress: [''],
      consigneeMobile: [''],
      consigneePin: [''],
      consigneeCity: [''],
      consigneeState: [''],
      consigneeEmail: [''],

      freightAmt: [0],
      fscAmt: [0],
      cgst: [0],
      sgst: [0],
      igst: [0],
      otherAmt: [0],
      totalAmt: [{ value: 0, disabled: true }],

      totalPcs: [0],
      totalWeight: [0],
      chargeableWeight: [0],
      currency: ['INR'],

      invoiceValue: [0],
      insurancePercent: [0],
      insuranceAmount: [{ value: 0, disabled: true }],

      itemType: [''],
      descOfGoods: [''],
      remarks: [''],

      holdStatus: ['unhold'],
      holdReason: [''],
      referenceNo: [''],
      fwdCourierName: [''],
      fwdNo: ['']
    });
  }

  onUpdate(): void {
    console.log('Updated Form:', this.form.getRawValue());
    alert('Record updated successfully!');
  }

  onClear(): void {
    this.form.reset({
      awbMode: 'manual',
      holdStatus: 'unhold',
      currency: 'INR'
    });
  }

  onPrint(): void {
    window.print();
  }

  onAddCharge(): void {
    alert('Add Charge clicked');
  }

  recalcTotals(): void {
    const val = this.form.getRawValue();
    const total =
      (Number(val.freightAmt) || 0) +
      (Number(val.fscAmt) || 0) +
      (Number(val.cgst) || 0) +
      (Number(val.sgst) || 0) +
      (Number(val.igst) || 0) +
      (Number(val.otherAmt) || 0);

    this.form.patchValue({ totalAmt: total }, { emitEvent: false });
  }

  recalcInsurance(): void {
    const val = this.form.getRawValue();
    const invoice = Number(val.invoiceValue) || 0;
    const percent = Number(val.insurancePercent) || 0;
    const insAmt = (invoice * percent) / 100;

    this.form.patchValue({ insuranceAmount: insAmt }, { emitEvent: false });
  }
}
