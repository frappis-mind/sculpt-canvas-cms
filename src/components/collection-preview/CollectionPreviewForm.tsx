
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import { FieldRenderer } from './FieldRenderer';
import { toast } from '@/hooks/use-toast';
import { adaptFieldsForPreview } from '@/utils/fieldAdapters';

interface CollectionPreviewFormProps {
  collectionId: string;
  fields: any[];
  isLoading: boolean;
  error: any;
}

export function CollectionPreviewForm({ 
  collectionId, 
  fields, 
  isLoading, 
  error 
}: CollectionPreviewFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [fieldDefinitions, setFieldDefinitions] = useState<any[]>([]);
  const [titleField, setTitleField] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      const adaptedFields = adaptFieldsForPreview(fields);
      setFieldDefinitions(adaptedFields);
      
      const initialData = fields.reduce((acc: Record<string, any>, field: any) => {
        acc[field.api_id] = field.default_value || '';
        return acc;
      }, {});
      setFormData(initialData);
      
      const firstTextField = fields.find((f: any) => f.type === 'text');
      if (firstTextField) {
        setTitleField(firstTextField.api_id);
      }
    }
  }, [fields]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    toast({
      title: "Data saved",
      description: "Your content has been successfully saved.",
    });
  };

  if (isLoading) {
    return <div>Loading collection fields...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{collectionId} Entry</CardTitle>
        <CardDescription>Fill in the fields to preview how the content will look</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          {fieldDefinitions && fieldDefinitions.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              formData={formData}
              titleField={titleField}
              onInputChange={handleInputChange}
            />
          ))}
          
          <div className="pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <SaveIcon className="mr-2 h-4 w-4" />
              Save Content
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
