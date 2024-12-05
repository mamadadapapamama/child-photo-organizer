export interface Photo {
  id: string;
  url: string;
  date: Date;
  selected: boolean;
}

export type SelectionCount = 30 | 50 | 100;

export interface PhotosByDate {
  [year: string]: {
    [month: string]: Photo[];
  };
}

export type ViewMode = 'all' | 'filtered';