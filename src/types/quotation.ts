
export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  detailedDescription?: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  issueDate: string;
  shootingDate?: string;
  billTo: {
    name: string;
    address: string;
    rtnNumber: string;
  };
  items: QuotationItem[];
  deliverables: string;
  paymentTerms: string;
  bankDetails: string;
  termsAndConditions: string;
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
