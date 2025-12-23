export type CaseType = {
  id: number;
  name: string;
  price: number;
  minWin: number;
  maxWin: number;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  icon: string;
};

export type HistoryItem = {
  id: number;
  caseName: string;
  amount: number;
  result: 'win' | 'loss';
  timestamp: Date;
};

export type TopPlayer = {
  id: number;
  name: string;
  balance: number;
  totalWins: number;
};
