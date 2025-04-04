
import React from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFieldsForCollection } from '@/services/CollectionService';
import { CollectionPreviewForm } from '@/components/collection-preview/CollectionPreviewForm';

export default function CollectionPreview() {
  const { collectionId } = useParams<{ collectionId: string }>();

  const { data: fields = [], isLoading, error } = useQuery({
    queryKey: ['fields', collectionId],
    queryFn: () => getFieldsForCollection(collectionId!),
    enabled: !!collectionId
  });

  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Collection Preview</h1>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Content
          </Button>
        </div>
        
        <CollectionPreviewForm 
          collectionId={collectionId || ''} 
          fields={fields} 
          isLoading={isLoading} 
          error={error}
        />
      </div>
    </MainLayout>
  );
}
