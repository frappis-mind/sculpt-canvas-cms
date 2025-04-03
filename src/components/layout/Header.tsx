
import React from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search components..." 
          className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-slate-600 hover:text-slate-900"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-slate-600 hover:text-slate-900 relative"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          New Component
        </Button>
      </div>
    </header>
  );
};

export default Header;
