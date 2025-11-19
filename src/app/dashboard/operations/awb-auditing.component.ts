import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-awb-auditing',
  templateUrl: './awb-auditing.component.html',
  styleUrls: ['./awb-auditing.component.css']
})
export class AwbAuditingComponent implements OnInit {
  form!: FormGroup;

  // Dropdown data (same as other components)
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

      // Item & Hold
      itemType: [''],
      descOfGoods: [''],
      remarks: [''],

      holdStatus: ['unhold'],
      holdReason: [''],
      referenceNo: [''],

      // forward fields (kept to avoid any data loss if used elsewhere)
      fwdCourierName: [''],
      fwdNo: ['']
    });
  }

  /** === Actions === */
  onVerify(): void {
    // use getRawValue to include disabled controls
    const payload = this.form.getRawValue();
    console.log('Verified Auditing payload:', payload);
    alert('AWB verified (audited) successfully!');
    // Hook: place actual backend call here if needed
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

  /** === Calculations === */
  recalcTotals(): void {
    const v = this.form.getRawValue();
    const total =
      (Number(v.freightAmt) || 0) +
      (Number(v.fscAmt) || 0) +
      (Number(v.cgst) || 0) +
      (Number(v.sgst) || 0) +
      (Number(v.igst) || 0) +
      (Number(v.otherAmt) || 0);

    // patchValue updates disabled control as well
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
