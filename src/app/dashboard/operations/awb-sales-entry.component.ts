import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-awb-sales-entry',
  templateUrl: './awb-sales-entry.component.html',
  styleUrls: ['./awb-sales-entry.component.css']
})
export class AwbSalesEntryComponent implements OnInit {
  form!: FormGroup;

  // Dropdown data
  paymentModes = ['Cash', 'Credit', 'Debit'];
  shipmentModes = ['Air', 'Surface', 'Express'];
  serviceTypes = ['Normal', 'Priority', 'Express'];
  docTypes = ['DOCUME', 'NON-DOC'];
  currencies = ['INR', 'USD', 'EUR'];
  itemTypes = ['Document', 'Parcel', 'Sample'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // AWB Info
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

      // Shipper
      shipperSearch: [''],
      shipperName: [''],
      shipperAddress: [''],
      shipperMobile: [''],
      shipperPin: [''],
      shipperCity: [''],
      shipperState: [''],
      shipperEmail: [''],

      // Consignee
      consigneeSearch: [''],
      consigneeName: [''],
      consigneeAddress: [''],
      consigneeMobile: [''],
      consigneePin: [''],
      consigneeCity: [''],
      consigneeState: [''],
      consigneeEmail: [''],

      // Billing
      freightAmt: [0],
      fscAmt: [0],
      cgst: [0],
      sgst: [0],
      igst: [0],
      otherAmt: [0],
      totalAmt: [{ value: 0, disabled: true }],

      // Totals
      totalPcs: [0],
      totalWeight: [0],
      chargeableWeight: [0],
      currency: ['INR'],

      // Invoice
      invoiceValue: [0],
      insurancePercent: [0],
      insuranceAmount: [{ value: 0, disabled: true }],

      // Item
      itemType: [''],
      descOfGoods: [''],
      remarks: [''],

      // Hold
      holdStatus: ['unhold'],
      holdReason: [''],
      referenceNo: ['']
    });
  }

  /** === Actions === */
  onSave(): void {
    console.log('Form Submitted:', this.form.getRawValue());
    alert('Saved successfully!');
  }

  onClear(): void {
    this.form.reset({
      awbMode: 'manual',
      holdStatus: 'unhold',
      currency: 'INR'
    });
  }

  onPrint(): void {
    console.log('Print data:', this.form.getRawValue());
    window.print();
  }

  onAddCharge(): void {
    alert('Add Charge clicked');
  }

  onBulkUpload(): void {
    alert('Bulk Upload clicked');
  }

  /** === Calculations === */
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
