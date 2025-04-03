
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ComponentEditor from '@/components/editor/ComponentEditor';
import { components } from '@/lib/dummyData';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the component by ID
  const component = components.find(comp => comp.id === id);
  
  if (!component) {
    return (
      <MainLayout>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Component Not Found</h1>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-500">The component you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Return to Dashboard
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const handleSave = () => {
    // In a real application, this would save to an API
    toast({
      title: "Changes saved",
      description: "Your component changes have been saved successfully.",
    });
  };
  
  return (
    <MainLayout>
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Editing: {component.name}</h1>
      </div>
      
      <div className="h-[calc(100vh-12rem)]">
        <ComponentEditor 
          component={component} 
          onSave={handleSave} 
        />
      </div>
    </MainLayout>
  );
};

export default Editor;
