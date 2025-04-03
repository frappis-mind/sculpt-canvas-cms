
import React from 'react';
import { Component } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface PreviewPanelProps {
  component: Component;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ component }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-4 border-b border-slate-200 bg-white">
        <Tabs defaultValue="desktop">
          <TabsList>
            <TabsTrigger value="mobile">
              <Smartphone className="mr-2 h-4 w-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="tablet">
              <Tablet className="mr-2 h-4 w-4" />
              Tablet
            </TabsTrigger>
            <TabsTrigger value="desktop">
              <Monitor className="mr-2 h-4 w-4" />
              Desktop
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-4 w-full max-w-4xl">
          <div>
            {/* This would be where we render the component preview based on the code */}
            {/* For now, we'll just display the properties */}
            <div className="p-4 border border-dashed border-slate-300 rounded-md">
              <h3 className="text-lg font-medium mb-4">Component Preview</h3>
              <div className="space-y-2">
                {component.properties.map(prop => (
                  <div key={prop.id} className="flex">
                    <span className="font-medium mr-2">{prop.name}:</span>
                    <span>
                      {typeof prop.value === 'boolean' 
                        ? prop.value ? 'True' : 'False'
                        : prop.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
