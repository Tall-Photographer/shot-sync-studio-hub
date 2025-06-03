
import { Quotation } from '@/types/quotation';

export const generateQuotationNumber = (existingQuotations: Quotation[]) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const dateStr = `${day}/${month}/${year}`;
  
  // Find the highest sequence number for today
  const todayQuotations = existingQuotations.filter(q => 
    q.quotationNumber.startsWith(dateStr)
  );
  
  const sequenceNumber = todayQuotations.length + 1;
  return `${dateStr}/${sequenceNumber}`;
};

export const getDefaultQuotationData = () => ({
  deliverables: 'ALL FINAL EDITED IMAGES TO BE DELIVERED IN 2 WORKING DAYS',
  bankDetails: `BANK NAME: ADCB BANK
ACCOUNT NAME: AHMED ADEL OSMAN MAHMOUD ATTIA
ACCOUNT NUMBER (AED): 11391890910001
IBAN: AE370030011391890910001
SWIFT CODE: ADCBAEAA`,
  termsAndConditions: `The above quotation is made as per the brief shared and subject to the conditions noted below:
Once signed this Estimate stands as a binding contract between two parties. ("Contract")
Any dispute, difference, controversy, or claim arising out of or in connection with this contract, including (but not limited to) any question regarding its existence, validity, interpretation, performance, discharge and applicable remedies, shall be subject to the exclusive jurisdiction of the Courts of the Dubai International Financial Centre ("the DIFC Courts").
Less than 48-hour cancellation notice before the shoot, 50% of the total amount will be due.
Additional production hours (including but not limited to filming, photography, and editing) are charged AED 500 per hour.
Late payment fee of AED 250 per 15-day delay will be applied from the payment due day.
Tallphotographer.com retains ownership of the RAW Files.
Tallphotographer.com owns exclusive rights to any footage until the payment is received. The client waves all the claims.
The individual signing this contract is the authorized signatory for the Client.`
});
