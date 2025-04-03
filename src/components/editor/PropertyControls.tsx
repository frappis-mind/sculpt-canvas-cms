
import React from 'react';
import { ComponentProperty } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyControlsProps {
  properties: ComponentProperty[];
  onPropertyChange: (id: string, value: any) => void;
}

const PropertyControls: React.FC<PropertyControlsProps> = ({ 
  properties, 
  onPropertyChange 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Properties</h3>
      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="space-y-2">
            <Label htmlFor={property.id}>{property.name}</Label>
            
            {property.type === 'string' && (
              <Input
                id={property.id}
                value={property.value}
                onChange={(e) => onPropertyChange(property.id, e.target.value)}
              />
            )}
            
            {property.type === 'number' && (
              <Input
                id={property.id}
                type="number"
                value={property.value}
                onChange={(e) => onPropertyChange(property.id, Number(e.target.value))}
              />
            )}
            
            {property.type === 'boolean' && (
              <div className="flex items-center space-x-2">
                <Switch
                  id={property.id}
                  checked={property.value}
                  onCheckedChange={(checked) => onPropertyChange(property.id, checked)}
                />
                <Label htmlFor={property.id}>{property.value ? 'Yes' : 'No'}</Label>
              </div>
            )}
            
            {property.type === 'color' && (
              <div className="flex space-x-2">
                <div 
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: property.value }}
                ></div>
                <Input
                  id={property.id}
                  type="text"
                  value={property.value}
                  onChange={(e) => onPropertyChange(property.id, e.target.value)}
                  className="flex-1"
                />
              </div>
            )}
            
            {property.type === 'select' && property.options && (
              <Select
                value={property.value}
                onValueChange={(value) => onPropertyChange(property.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {property.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyControls;
