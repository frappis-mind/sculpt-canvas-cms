
import React, { useState } from 'react';
import ComponentCard from './ComponentCard';
import { Component } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ComponentGridProps {
  components: Component[];
}

const ComponentGrid: React.FC<ComponentGridProps> = ({ components }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const categories = ['all', 'layout', 'input', 'display', 'navigation', 'feedback'];
  
  const filteredComponents = activeTab === 'all' 
    ? components 
    : components.filter(component => component.category === activeTab);

  const handleEdit = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredComponents.map(component => (
          <ComponentCard 
            key={component.id} 
            component={component} 
            onEdit={handleEdit}
          />
        ))}
      </div>
      
      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No components found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ComponentGrid;
