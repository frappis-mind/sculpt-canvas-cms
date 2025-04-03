
import React from 'react';
import { Component } from '@/lib/types';
import PropertyControls from './PropertyControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save, Code2, Sliders } from 'lucide-react';

interface EditorPanelProps {
  component: Component;
  onChange: (updatedComponent: Component) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ component, onChange }) => {
  const handlePropertyChange = (id: string, value: any) => {
    const updatedProperties = component.properties.map(prop => 
      prop.id === id ? { ...prop, value } : prop
    );
    
    onChange({
      ...component,
      properties: updatedProperties
    });
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold">{component.name}</h2>
        <p className="text-sm text-slate-500">{component.description}</p>
      </div>
      
      <Tabs defaultValue="properties" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="properties">
            <Sliders className="mr-2 h-4 w-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code2 className="mr-2 h-4 w-4" />
            Code
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties" className="flex-1 overflow-y-auto p-4">
          <PropertyControls 
            properties={component.properties} 
            onPropertyChange={handlePropertyChange}
          />
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Component Code</h3>
            <pre className="bg-slate-100 p-4 rounded text-sm overflow-x-auto">
              {component.code}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border-t border-slate-200">
        <Button className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditorPanel;
