import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink, Download, CheckCircle, AlertCircle, Globe } from "lucide-react";

interface Document {
  name: string;
  description: string;
  url: string;
  required: boolean;
  country: 'singapore' | 'malaysia' | 'both';
  type: 'arrival_card' | 'visa' | 'insurance' | 'guide';
  notes?: string;
}

const TRAVEL_DOCUMENTS: Document[] = [
  {
    name: "Singapore Arrival Card (SGAC)",
    description: "Required digital arrival card for entering/returning to Singapore",
    url: "https://eservices.ica.gov.sg/sgarrivalcard/",
    required: true,
    country: 'singapore',
    type: 'arrival_card',
    notes: "Submit within 3 days before arrival. Free of charge."
  },
  {
    name: "Malaysia Digital Arrival Card (MDAC)",
    description: "Required digital arrival card for entering Malaysia",
    url: "https://imigresen-online.imi.gov.my/mdac/main",
    required: true,
    country: 'malaysia',
    type: 'arrival_card',
    notes: "Submit within 3 days before arrival. Singapore citizens exempt."
  },
  {
    name: "Malaysia Auto Gate Registration",
    description: "Register for faster immigration clearance at Malaysia Auto Gates",
    url: "https://imigresen-online.imi.gov.my/eservices/main",
    required: false,
    country: 'malaysia',
    type: 'guide',
    notes: "Optional but speeds up border crossing significantly."
  },
  {
    name: "ICA SG Immigration Info",
    description: "Official Singapore immigration requirements and updates",
    url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore",
    required: false,
    country: 'singapore',
    type: 'guide',
    notes: "Check for latest entry requirements and visa policies."
  },
  {
    name: "Malaysia Immigration Portal",
    description: "Official Malaysia immigration requirements and visa info",
    url: "https://www.imi.gov.my/",
    required: false,
    country: 'malaysia',
    type: 'guide',
    notes: "Check for visa requirements based on your nationality."
  },
  {
    name: "Vehicle Entry Permit (VEP)",
    description: "Required if driving your own vehicle into Malaysia",
    url: "https://www.jpj.gov.my/en/web/vep/",
    required: false,
    country: 'malaysia',
    type: 'visa',
    notes: "Only needed if driving your own car. Grab rides don't require this."
  }
];

export function DocumentsTab() {
  const requiredDocs = TRAVEL_DOCUMENTS.filter(doc => doc.required);
  const optionalDocs = TRAVEL_DOCUMENTS.filter(doc => !doc.required);

  return (
    <Card className="border-gray-200 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            Travel Documents
          </h3>
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
            Essential Forms
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Complete these forms before your trip. Required documents should be submitted 1-3 days before travel.
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Required Documents
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {requiredDocs.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  doc.country === 'singapore' 
                    ? 'border-red-200 bg-red-50 hover:border-red-400' 
                    : 'border-blue-200 bg-blue-50 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${
                        doc.country === 'singapore' 
                          ? 'bg-red-200 text-red-700' 
                          : 'bg-blue-200 text-blue-700'
                      }`}>
                        {doc.country === 'singapore' ? '🇸🇬 SG' : '🇲🇾 MY'}
                      </span>
                      <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 mb-1">{doc.name}</p>
                    <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                    {doc.notes && (
                      <p className="text-xs text-gray-500">{doc.notes}</p>
                    )}
                  </div>
                  <ExternalLink className={`w-5 h-5 flex-shrink-0 ml-2 ${
                    doc.country === 'singapore' ? 'text-red-400' : 'text-blue-400'
                  }`} />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Additional Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optionalDocs.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        doc.country === 'singapore' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {doc.country === 'singapore' ? '🇸🇬 SG' : '🇲🇾 MY'}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800 text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <strong>Tip:</strong> Complete arrival cards 1-3 days before your trip. Keep confirmation emails/PDFs on your phone for immigration. 
              Requirements may change—always verify on official government websites before travel.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
