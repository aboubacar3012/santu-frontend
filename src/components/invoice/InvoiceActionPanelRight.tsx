'use client';

import Button from '@/src/components/shared/Button';
import { Invoice, StatusEnum } from '@/src/types';
import { useState } from 'react';
import { FaPrint, FaEnvelope, FaDownload, FaShare } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdPayment, MdContentCopy } from 'react-icons/md';
import QRCode from 'react-qr-code';

interface InvoiceActionPanelProps {
  invoice: Invoice;
  handlePrint: () => void;
}

const InvoiceActionPanelRight = ({ invoice, handlePrint }: InvoiceActionPanelProps) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleCopyInvoiceLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 3000);
  };

  return (
    <div className="md:w-1/4 w-full no-print order-1 md:order-2">
      <div className="bg-white rounded-xl overflow-hidden shadow-md sticky top-20">
        <div className="bg-gradient-to-r from-my-raspberry to-my-eggplant p-4 text-white">
          <h3 className="font-medium">Actions</h3>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <Button
            onClick={handlePrint}
            variant="secondary"
            className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
            icon={<FaPrint />}
            iconPosition="left"
          >
            Imprimer
          </Button>

          <Button
            onClick={() => alert('Fonctionnalité en cours de développement')}
            variant="secondary"
            className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
            icon={<FaEnvelope />}
            iconPosition="left"
          >
            Envoyer par email
          </Button>

          {invoice.status === StatusEnum.DRAFT && (
            <Button
              variant="secondary"
              className="flex items-center justify-start gap-2 hover:bg-green-100 text-green-700 transition-colors"
              icon={<MdPayment />}
              iconPosition="left"
              onClick={() => alert('Vous avez marqué cette facture comme payée!')}
            >
              Marquer comme payée
            </Button>
          )}
          {invoice.status === StatusEnum.DRAFT && (
            <Button
              variant="secondary"
              className="flex items-center justify-start gap-2 hover:bg-red-100 text-red-700 transition-colors"
              icon={<IoMdClose />}
              iconPosition="left"
              onClick={() => alert('Vous avez abandonné cette facture!')}
            >
              Abandonner
            </Button>
          )}

          <Button
            onClick={() => alert('Fonctionnalité en cours de développement')}
            variant="secondary"
            className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
            icon={<FaDownload />}
            iconPosition="left"
          >
            Télécharger PDF
          </Button>

          <Button
            onClick={handleCopyInvoiceLink}
            variant="secondary"
            className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
            icon={<MdContentCopy />}
            iconPosition="left"
          >
            {showCopiedMessage ? 'Lien copié!' : 'Copier le lien'}
          </Button>

          <Button
            onClick={() => alert('Fonctionnalité en cours de développement')}
            variant="secondary"
            className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
            icon={<FaShare />}
            iconPosition="left"
          >
            Partager
          </Button>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-3 h-3 rounded-full 
                ${invoice.status === StatusEnum.PAID && 'bg-green-500'}
                ${invoice.status === StatusEnum.DRAFT && 'bg-amber-500'}
                ${invoice.status === StatusEnum.CANCELLED && 'bg-red-500'}
                ${
                  invoice.status !== StatusEnum.PAID &&
                  invoice.status !== StatusEnum.DRAFT &&
                  invoice.status !== StatusEnum.CANCELLED &&
                  'bg-blue-500'
                }`}
            ></div>
            <span className="text-sm font-medium">
              {invoice.status === StatusEnum.PAID && 'Payée'}
              {invoice.status === StatusEnum.DRAFT && 'Brouillon'}
              {invoice.status === StatusEnum.CANCELLED && 'Annulée'}
              {invoice.status !== StatusEnum.PAID &&
                invoice.status !== StatusEnum.DRAFT &&
                invoice.status !== StatusEnum.CANCELLED &&
                'En attente'}
            </span>
          </div>

          <div className="flex flex-col text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Date d'émission:</span>
              <span className="font-medium">{invoice.date}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Paiement dû:</span>
              <span className="font-medium">
                {invoice.paymentCondition === 'NOW'
                  ? 'Immédiat'
                  : `${invoice.date} + ${invoice.paymentCondition}j`}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50">
          <h4 className="font-medium text-sm mb-2">Scanner pour payer</h4>
          <div className="bg-white p-3 rounded flex justify-center">
            <QRCode
              size={150}
              value={`https://santu-pro.com/pay/${123456}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceActionPanelRight;
