
import React, { useState } from 'react';
import { Component } from '@/lib/types';
import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface ComponentEditorProps {
  component: Component;
  onSave: (updatedComponent: Component) => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ 
  component: initialComponent,
  onSave 
}) => {
  const [component, setComponent] = useState<Component>(initialComponent);
  
  const handleChange = (updatedComponent: Component) => {
    setComponent(updatedComponent);
  };
  
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30}>
          <EditorPanel 
            component={component} 
            onChange={handleChange} 
          />
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={60}>
          <PreviewPanel component={component} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ComponentEditor;
