
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface SliderFieldProps {
  id: string;
  label?: string;
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  helpText?: string;
  className?: string;
  showInput?: boolean;
  disabled?: boolean;
}

export function SliderField({
  id,
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  required = false,
  helpText,
  className,
  showInput = true,
  disabled = false
}: SliderFieldProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);
    
    // Validate input is within bounds
    if (isNaN(newValue)) {
      newValue = min;
    } else {
      newValue = Math.max(min, Math.min(max, newValue));
    }
    
    onChange(newValue);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Slider
            id={id}
            defaultValue={[value]}
            value={[value]}
            onValueChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-describedby={helpText ? `${id}-description` : undefined}
          />
        </div>
        
        {showInput && (
          <Input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-20"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
          />
        )}
      </div>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default SliderField;
