
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Component } from '@/lib/types';
import { Calendar, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ComponentCardProps {
  component: Component;
  onEdit: (id: string) => void;
}

const CategoryColors = {
  layout: 'bg-purple-100 text-purple-800',
  input: 'bg-green-100 text-green-800',
  display: 'bg-blue-100 text-blue-800',
  navigation: 'bg-amber-100 text-amber-800',
  feedback: 'bg-rose-100 text-rose-800',
};

const ComponentCard: React.FC<ComponentCardProps> = ({ component, onEdit }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <div className="h-32 bg-slate-100 flex items-center justify-center border-b">
        <img 
          src={component.thumbnail} 
          alt={component.name} 
          className="max-h-full object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg truncate">{component.name}</h3>
            <p className="text-sm text-slate-500 line-clamp-2 h-10">{component.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(component.id)}>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-slate-500 pt-0">
        <Badge 
          variant="outline" 
          className={`${CategoryColors[component.category]} border-0`}
        >
          {component.category}
        </Badge>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{format(component.lastEdited, 'MMM d, yyyy')}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
