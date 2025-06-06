
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import { Quotation } from '@/types/quotation';
import { useToast } from '@/hooks/use-toast';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';

interface QuotationPDFViewerProps {
  quotation: Quotation;
  documentType?: 'quotation' | 'invoice';
}

const QuotationPDFViewer = ({ quotation, documentType = 'quotation' }: QuotationPDFViewerProps) => {
  const { toast } = useToast();
  const { generalSettings } = useGeneralSettings();

  const handleDownload = () => {
    // Hide everything except the quotation content
    const originalTitle = document.title;
    const printContents = document.querySelector('.quotation-content')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      // Set the filename in the document title
      const prefix = documentType === 'invoice' ? 'I-' : 'Q-';
      const filename = `${prefix}${quotation.quotationNumber}`;
      document.title = filename;

      // Replace body content with just the quotation
      document.body.innerHTML = `
        <div style="margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
          ${printContents}
        </div>
      `;

      // Print
      window.print();

      // Restore original content and title
      document.body.innerHTML = originalContents;
      document.title = originalTitle;
      
      // Re-bind event listeners by triggering a page refresh
      window.location.reload();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      const prefix = documentType === 'invoice' ? 'Invoice' : 'Quotation';
      navigator.share({
        title: `${prefix} ${quotation.quotationNumber}`,
        text: `${prefix} for ${quotation.billTo.name}`,
        url: window.location.href
      }).catch(() => {
        toast({
          title: "Share Failed",
          description: "Unable to share. Please try downloading instead."
        });
      });
    } else {
      toast({
        title: `Share ${documentType === 'invoice' ? 'Invoice' : 'Quotation'}`,
        description: "Use your browser's share or print function to share this document."
      });
    }
  };

  const documentTitle = documentType === 'invoice' ? 'Invoice' : 'Quotation';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{documentTitle} Preview</h2>
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
        <CardContent className="quotation-content p-4 space-y-3 print:p-0 max-w-[210mm] mx-auto" style={{ fontSize: '8px', lineHeight: '1.2' }}>
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 style={{ fontSize: '8px' }} className="font-normal text-gray-600 tracking-wider">
                AHMED ADEL PHOTOGRAPHY SERVICES
              </h1>
              <div style={{ fontSize: '8px' }} className="text-gray-600 space-y-0.5">
                <div>CNN BUILDING - 2 KING SALMAN BIN</div>
                <div>ABDULAZIZ AL SAUD ST -DMC - DUBAI, UAE</div>
                <div>WWW.TALLPHOTOGRAPHER.COM</div>
                <div>INFO@TALLPHOTOGRAPHER.COM</div>
                <div>00971 52 531 1091</div>
              </div>
            </div>
            <div className="text-right">
              {generalSettings.businessLogo ? (
                <div className="w-20 h-16 flex items-center justify-center">
                  <img 
                    src={generalSettings.businessLogo} 
                    alt="Business Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span style={{ fontSize: '6px' }} className="text-gray-500">LOGO</span>
                </div>
              )}
            </div>
          </div>

          {/* Document Title and Details */}
          <div className="space-y-2">
            <h2 style={{ fontSize: '20px' }} className="font-bold text-gray-900">{documentTitle.toUpperCase()}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div style={{ fontSize: '8px' }}><strong>{quotation.quotationNumber}</strong></div>
                <div style={{ fontSize: '8px' }}>ISSUE DATE: {quotation.issueDate}</div>
                <div style={{ fontSize: '8px' }}>SHOOTING DATE: {quotation.shootingDate || 'TBD'}</div>
              </div>
              <div className="text-right">
                <div style={{ fontSize: '8px' }} className="font-semibold">BILL TO: {quotation.billTo.name.toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-1" style={{ fontSize: '10px', fontWeight: 'bold' }}>
              <span>DESCRIPTION</span>
              <span>PRICE</span>
            </div>

            {quotation.items.map((item, index) => (
              <div key={item.id} className="space-y-1">
                <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{item.description.toUpperCase()}</div>
                {item.detailedDescription && (
                  <ul className="list-disc list-inside text-gray-700 space-y-0.5 ml-2">
                    {item.detailedDescription.split('\n').map((line, lineIndex) => (
                      <li key={lineIndex} style={{ fontSize: '8px' }}>{line}</li>
                    ))}
                  </ul>
                )}
                <div className="text-right">
                  <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{item.total.toLocaleString()} AED</span>
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          {quotation.deliverables && (
            <div className="space-y-1">
              <div style={{ fontSize: '10px', fontWeight: 'bold' }}>DELIVERABLES:</div>
              <div className="text-gray-700 ml-2">
                {quotation.deliverables.split('\n').map((line, index) => (
                  <div key={index} style={{ fontSize: '8px' }}>• {line}</div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex justify-between" style={{ fontSize: '10px', fontWeight: 'bold' }}>
              <span>TOTAL</span>
              <span>{quotation.total.toLocaleString()} AED</span>
            </div>

            {/* Payment Terms */}
            {quotation.paymentTerms && (
              <div className="space-y-1">
                <div style={{ fontSize: '10px', fontWeight: 'bold' }}>• PAYMENT TERMS</div>
                {quotation.paymentTerms.split('\n').map((term, index) => (
                  <div key={index} style={{ fontSize: '8px' }} className="ml-1">• {term}</div>
                ))}
              </div>
            )}
          </div>

          {/* Bank Details */}
          {quotation.bankDetails && (
            <div className="text-center space-y-0.5 pt-2 border-t">
              {quotation.bankDetails.split('\n').map((line, index) => {
                if (line.includes(':')) {
                  const [label, value] = line.split(':');
                  return (
                    <div key={index} style={{ fontSize: '8px' }}>
                      <strong>{label.trim()}:</strong> {value.trim()}
                    </div>
                  );
                }
                return <div key={index} style={{ fontSize: '8px' }}>{line}</div>;
              })}
            </div>
          )}

          {/* Terms and Conditions */}
          {quotation.termsAndConditions && (
            <div className="text-gray-600 space-y-1 pt-2 border-t">
              <div style={{ fontSize: '6px', fontWeight: 'bold' }}>
                {quotation.termsAndConditions.split('\n')[0]}
              </div>
              <ul className="space-y-0.5">
                {quotation.termsAndConditions.split('\n').slice(1).map((term, index) => (
                  <li key={index} style={{ fontSize: '6px' }}>• {term}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationPDFViewer;
