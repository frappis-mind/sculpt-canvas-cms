
export interface Component {
  id: string;
  name: string;
  description: string;
  category: 'layout' | 'input' | 'display' | 'navigation' | 'feedback';
  thumbnail: string;
  lastEdited: Date;
  properties: ComponentProperty[];
  code: string;
}

export interface ComponentProperty {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'color' | 'select';
  value: any;
  options?: string[];
}
