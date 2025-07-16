import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ocean Runner - SF to Forest City Malaysia',
        text: 'Check out this epic ocean run challenge!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-ocean-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-ocean-500 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5 5.5C13.5 5.77614 13.2761 6 13 6C12.7239 6 12.5 5.77614 12.5 5.5C12.5 5.22386 12.7239 5 13 5C13.2761 5 13.5 5.22386 13.5 5.5Z"/>
                <path d="M9.5 14.5C9.5 14.7761 9.27614 15 9 15C8.72386 15 8.5 14.7761 8.5 14.5C8.5 14.2239 8.72386 14 9 14C9.27614 14 9.5 14.2239 9.5 14.5Z"/>
                <path d="M12 2C12.2652 2 12.5196 2.10536 12.7071 2.29289L15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6V19C16 19.5523 15.5523 20 15 20H9C8.44772 20 8 19.5523 8 19V6C8 5.73478 8.10536 5.48043 8.29289 5.29289L11.2929 2.29289C11.4804 2.10536 11.7348 2 12 2Z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-ocean-800">Ocean Runner</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-ocean-600 text-sm">San Francisco to Forest City, Malaysia</span>
            <Button 
              onClick={handleShare}
              className="bg-ocean-500 text-white hover:bg-ocean-600"
            >
              <Share className="w-4 h-4 mr-2" />
              Share Route
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
