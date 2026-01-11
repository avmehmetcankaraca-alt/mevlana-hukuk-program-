
export interface Petition {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  caseNumber?: string;
  clientName?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  files?: AttachedFile[];
}

export interface AttachedFile {
  name: string;
  type: string;
  base64: string;
}

export enum Page {
  Home = 'home',
  PetitionCreator = 'petition-creator',
  Archive = 'archive',
  Settings = 'settings'
}
