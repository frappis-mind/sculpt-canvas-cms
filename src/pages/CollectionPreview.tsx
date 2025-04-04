
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateCalendarField } from '@/components/fields/inputs/DateCalendarField';
import { InputTextField } from '@/components/fields/inputs/InputTextField';
import { NumberInputField } from '@/components/fields/inputs/NumberInputField';
import { SelectButtonField } from '@/components/form-fields/SelectButtonField';
import { PasswordInputField } from '@/components/fields/inputs/PasswordInputField';
import { MaskInputField } from '@/components/fields/inputs/MaskInputField';
import { OTPInputField } from '@/components/fields/inputs/OTPInputField';
import { AutocompleteInputField } from '@/components/fields/inputs/AutocompleteInputField';
import { BlockEditorField } from '@/components/fields/inputs/BlockEditorField';
import { WysiwygEditorField } from '@/components/fields/inputs/WysiwygEditorField';
import { MarkdownEditorField } from '@/components/fields/inputs/MarkdownEditorField';
import { TagsInputField } from '@/components/fields/inputs/TagsInputField';
import { SlugInputField } from '@/components/fields/inputs/SlugInputField';
import { useQuery } from '@tanstack/react-query';
import { getFieldsForCollection } from '@/services/CollectionService';
import { adaptFieldsForPreview } from '@/utils/fieldAdapters';
import { toast } from '@/hooks/use-toast';
import { SaveIcon } from 'lucide-react';

export default function CollectionPreview() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [fieldDefinitions, setFieldDefinitions] = useState<any[]>([]);
  const [titleField, setTitleField] = useState<string | null>(null);

  const { data: fields = [], isLoading, error } = useQuery({
    queryKey: ['fields', collectionId],
    queryFn: () => getFieldsForCollection(collectionId!),
    enabled: !!collectionId
  });

  useEffect(() => {
    if (fields) {
      const adaptedFields = adaptFieldsForPreview(fields);
      setFieldDefinitions(adaptedFields);
      
      // Initialize form data with default values
      const initialData = fields.reduce((acc: Record<string, any>, field: any) => {
        acc[field.api_id || field.apiId] = field.default_value || '';
        return acc;
      }, {});
      setFormData(initialData);
      
      // Find the first "text" field to use as a title field for slug generation
      const firstTextField = fields.find((f: any) => f.type === 'text');
      if (firstTextField) {
        setTitleField(firstTextField.api_id || firstTextField.apiId);
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

  const renderField = (field: any) => {
    const commonProps = {
      key: field.id,
      id: field.apiId,
      label: field.name,
      value: formData[field.apiId],
      onChange: (value: any) => handleInputChange(field.apiId, value),
      required: field.required || false,
      helpText: field.helpText || null,
      className: "mb-5",
    };

    switch (field.type) {
      case 'text':
        return (
          <InputTextField
            {...commonProps}
            placeholder={field.placeholder || `Enter ${field.name}`}
            keyFilter={field.keyFilter || "none"}
            floatLabel={field.appearance?.floatLabel}
            filled={field.appearance?.filled}
          />
        );
      case 'textarea':
        return (
          <div className="mb-5">
            <Label htmlFor={field.apiId}>{field.name}{field.required && <span className="text-red-500 ml-1">*</span>}</Label>
            <Textarea
              id={field.apiId}
              value={formData[field.apiId] || ''}
              onChange={(e) => handleInputChange(field.apiId, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.name}`}
              required={field.required}
              className="mt-1"
              rows={5}
            />
            {field.helpText && (
              <p className="text-muted-foreground text-xs mt-1">{field.helpText}</p>
            )}
          </div>
        );
      case 'number':
        return (
          <NumberInputField
            {...commonProps}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder || `Enter a number`}
            floatLabel={field.appearance?.floatLabel}
            filled={field.appearance?.filled}
            showButtons={field.advanced?.showButtons}
            buttonLayout={field.advanced?.buttonLayout || "horizontal"}
            prefix={field.advanced?.prefix}
            suffix={field.advanced?.suffix}
          />
        );
      case 'boolean':
      case 'toggle':
        return (
          <div key={field.id} className="flex items-center space-x-2 mb-5">
            <Switch
              id={field.apiId}
              checked={formData[field.apiId] || false}
              onCheckedChange={(checked) => handleInputChange(field.apiId, checked)}
            />
            <Label htmlFor={field.apiId}>{field.name}{field.required && <span className="text-red-500 ml-1">*</span>}</Label>
          </div>
        );
      case 'select':
        return (
          <div className="mb-5">
            <Label htmlFor={field.apiId}>{field.name}{field.required && <span className="text-red-500 ml-1">*</span>}</Label>
            <Select 
              onValueChange={(value) => handleInputChange(field.apiId, value)}
              defaultValue={formData[field.apiId] || ''}
            >
              <SelectTrigger id={field.apiId} className="mt-1">
                <SelectValue placeholder={`Select ${field.name}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options &&
                  field.options.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {field.helpText && (
              <p className="text-muted-foreground text-xs mt-1">{field.helpText}</p>
            )}
          </div>
        );
      case 'selectbutton':
        return (
          <SelectButtonField
            {...commonProps}
            options={field.options}
            value={formData[field.apiId] || ''}
          />
        );
      case 'date':
        return (
          <DateCalendarField
            {...commonProps}
            value={formData[field.apiId] || null}
            onChange={(date: Date) => {
              handleInputChange(field.apiId, date);
            }}
          />
        );
      case 'password':
        return (
          <PasswordInputField
            {...commonProps}
            placeholder={field.placeholder || `Enter password`}
            floatLabel={field.appearance?.floatLabel}
            filled={field.appearance?.filled}
          />
        );
      case 'mask':
        return (
          <MaskInputField
            {...commonProps}
            placeholder={field.placeholder || `Enter value`}
            mask={field.mask || ''}
            floatLabel={field.appearance?.floatLabel}
            filled={field.appearance?.filled}
          />
        );
      case 'otp':
        return (
          <OTPInputField
            {...commonProps}
            length={field.length || 6}
          />
        );
      case 'autocomplete':
        return (
          <AutocompleteInputField
            {...commonProps}
            placeholder={field.placeholder || `Type to search...`}
            options={field.options || []}
            floatLabel={field.appearance?.floatLabel}
            filled={field.appearance?.filled}
          />
        );
      case 'blockeditor':
        return (
          <BlockEditorField
            {...commonProps}
            placeholder={field.placeholder || `Enter content...`}
            minHeight={field.minHeight || '200px'}
          />
        );
      case 'wysiwyg':
        return (
          <WysiwygEditorField
            {...commonProps}
            placeholder={field.placeholder || `Enter content...`}
            minHeight={field.minHeight || '200px'}
          />
        );
      case 'markdown':
        return (
          <MarkdownEditorField
            {...commonProps}
            placeholder={field.placeholder || `Enter markdown content...`}
            rows={field.rows || 10}
          />
        );
      case 'tags':
        return (
          <TagsInputField
            {...commonProps}
            value={formData[field.apiId] || []}
            placeholder={field.placeholder || `Add tags...`}
            maxTags={field.maxTags || 10}
          />
        );
      case 'slug':
        return (
          <SlugInputField
            {...commonProps}
            placeholder={field.placeholder || `url-friendly-slug`}
            sourceValue={titleField ? formData[titleField] : ''}
            prefix={field.prefix || ''}
            suffix={field.suffix || ''}
          />
        );
      default:
        return <div key={field.id}>Unknown field type: {field.type}</div>;
    }
  };

  if (isLoading) {
    return <MainLayout>Loading collection fields...</MainLayout>;
  }

  if (error) {
    return <MainLayout>Error: {(error as Error).message}</MainLayout>;
  }

  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Collection Preview</h1>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Content
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{collectionId} Entry</CardTitle>
            <CardDescription>Fill in the fields to preview how the content will look</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-2">
              {fieldDefinitions && fieldDefinitions.map((field) => renderField(field))}
              
              <div className="pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Content</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
