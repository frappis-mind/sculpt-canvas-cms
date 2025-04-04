
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Paintbrush } from 'lucide-react';

interface ColorPickerFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  showAlpha?: boolean;
}

export function ColorPickerField({
  id,
  label,
  value = '#000000',
  onChange,
  placeholder = 'Select color',
  required = false,
  helpText,
  className,
  showAlpha = false
}: ColorPickerFieldProps) {
  const [open, setOpen] = useState(false);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-md border border-input shadow-sm" 
          style={{ backgroundColor: value || '#000000' }}
        />
        
        <Input
          id={id}
          type="text"
          value={value}
          onChange={handleColorChange}
          placeholder={placeholder}
          className="flex-1"
        />
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9"
              aria-label="Select color"
            >
              <Paintbrush className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Pick a color</label>
              <input 
                type="color" 
                value={value}
                onChange={handleColorChange}
                className="w-32 h-32 cursor-pointer"
              />
              {showAlpha && (
                <div className="mt-2">
                  <label className="text-xs text-muted-foreground">Alpha</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value="1" 
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default ColorPickerField;
