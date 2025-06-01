
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import { Quotation } from '../settings/QuotationsTab';
import { useToast } from '@/hooks/use-toast';

interface QuotationPDFViewerProps {
  quotation: Quotation;
}

const QuotationPDFViewer = ({ quotation }: QuotationPDFViewerProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    // Generate PDF and download
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Quotation ${quotation.quotationNumber}`,
        text: `Quotation for ${quotation.billTo.name}`,
        url: window.location.href
      });
    } else {
      toast({
        title: "Share Quotation",
        description: "Use your browser's share or print function to share this quotation."
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quotation Preview</h2>
        <div className="flex gap-2">
          <Button onClick={handleDownload} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={handleShare} size="sm" variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-8 space-y-6 print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-sm font-normal text-gray-600 tracking-wider">
                AHMED ADEL PHOTOGRAPHY SERVICES
              </h1>
              <div className="text-xs text-gray-600 space-y-0.5">
                <div>CNN BUILDING - 2 KING SALMAN BIN</div>
                <div>ABDULAZIZ AL SAUD ST -DMC - DUBAI, UAE</div>
                <div>WWW.TALLPHOTOGRAPHER.COM</div>
                <div>INFO@TALLPHOTOGRAPHER.COM</div>
                <div>00971 52 531 1091</div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">LOGO</span>
              </div>
              <div className="mt-2 text-xs text-gray-600">TallPhotographer</div>
            </div>
          </div>

          {/* Quotation Title and Details */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">QUOTATION</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1 text-sm">
                <div><strong>{quotation.quotationNumber}</strong></div>
                <div>ISSUE DATE: {quotation.issueDate}</div>
                <div>SHOOTING DATE: {quotation.shootingDate || 'TBD'}</div>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold">BILL TO: {quotation.billTo.name.toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="space-y-6">
            <div className="flex justify-between text-lg font-semibold border-b pb-2">
              <span>DESCRIPTION</span>
              <span>PRICE</span>
            </div>

            {quotation.items.map((item, index) => (
              <div key={item.id} className="space-y-4">
                <div className="font-semibold text-base">{item.description.toUpperCase()}</div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>{item.quantity} PRODUCTS</li>
                  <li>5 IMAGES EACH</li>
                  <li>UP TO 4 HOURS AT CLIENT'S LOCATION</li>
                </ul>
                <div className="text-right">
                  <span className="text-lg font-semibold">{item.total.toLocaleString()} AED</span>
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <div className="font-semibold text-sm">DELIVERABLES:</div>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
              <li>ALL FINAL EDITED IMAGES TO BE DELIVERED IN 2 WORKING DAYS</li>
            </ul>
          </div>

          {/* Total */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex justify-between text-2xl font-bold">
              <span>TOTAL</span>
              <span>{quotation.total.toLocaleString()} AED</span>
            </div>

            {/* Payment Terms */}
            <div className="space-y-2 text-sm">
              <div className="font-semibold">• PAYMENT TERMS</div>
              {quotation.paymentTerms.split('\n').map((term, index) => (
                <div key={index} className="ml-2">• {term}</div>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="text-center space-y-1 text-sm pt-6 border-t">
            <div><strong>BANK NAME:</strong> ADCB BANK</div>
            <div><strong>ACCOUNT NAME:</strong> AHMED ADEL OSMAN MAHMOUD ATTIA</div>
            <div><strong>ACCOUNT NUMBER (AED):</strong> 11391890910001</div>
            <div><strong>IBAN:</strong> AE370030011391890910001</div>
            <div><strong>SWIFT CODE:</strong> ADCBAEAA</div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-xs text-gray-600 space-y-2 pt-6 border-t">
            <div className="font-semibold">
              The above quotation is made as per the brief shared and subject to the conditions noted below:
            </div>
            <ul className="space-y-1">
              <li>• Once signed this Estimate becomes a contract between two parties. ("Contract")</li>
              <li>• Any dispute, difference, controversy, or claim arising out of or in connection with this contract, including (but not limited to) any question regarding its existence, validity, breach, termination, or application thereof, shall be subject to the exclusive jurisdiction of the Courts of the Dubai International Financial Centre ("the DIFC Courts").</li>
              <li>• Less than 48-hour cancellation notice before the shoot, 50% of the total amount will be due.</li>
              <li>• Additional production hours (including but not limited to filming, photography, and editing) are charged AED 500 per hour.</li>
              <li>• Late payment fee of AED 250 per 15-day delay will be applied from the payment due day.</li>
              <li>• Tallphotographer.com retains ownership of the RAW Files.</li>
              <li>• Tallphotographer.com owns exclusive rights to any footage until the payment is received. The client waives all the claims.</li>
              <li>• The individual signing this contract is the authorized signatory for the Client.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationPDFViewer;
