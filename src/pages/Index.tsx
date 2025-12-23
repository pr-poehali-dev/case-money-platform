import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { CaseType, HistoryItem, TopPlayer } from '@/types';
import CaseOpeningDialog from '@/components/CaseOpeningDialog';
import PaymentDialogs from '@/components/PaymentDialogs';

const Index = () => {
  const INITIAL_BALANCE = 5;
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [totalProfit, setTotalProfit] = useState(0);
  const [openCase, setOpenCase] = useState<CaseType | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const cases: CaseType[] = [
    { id: 1, name: 'Бронзовый кейс', price: 10, minWin: 0, maxWin: 30, rarity: 'bronze', icon: '🥉' },
    { id: 2, name: 'Серебряный кейс', price: 25, minWin: 10, maxWin: 75, rarity: 'silver', icon: '🥈' },
    { id: 3, name: 'Золотой кейс', price: 50, minWin: 20, maxWin: 150, rarity: 'gold', icon: '🥇' },
    { id: 4, name: 'Платиновый кейс', price: 100, minWin: 50, maxWin: 300, rarity: 'platinum', icon: '💎' },
    { id: 5, name: 'Легендарный кейс', price: 250, minWin: 100, maxWin: 1000, rarity: 'legendary', icon: '👑' },
    { id: 6, name: 'Стартовый', price: 5, minWin: 0, maxWin: 15, rarity: 'bronze', icon: '🎁' },
    { id: 7, name: 'Быстрый', price: 15, minWin: 5, maxWin: 45, rarity: 'bronze', icon: '⚡' },
    { id: 8, name: 'Удачливый', price: 30, minWin: 15, maxWin: 90, rarity: 'silver', icon: '🍀' },
    { id: 9, name: 'Премиум', price: 75, minWin: 30, maxWin: 200, rarity: 'gold', icon: '💰' },
    { id: 10, name: 'VIP', price: 150, minWin: 75, maxWin: 450, rarity: 'platinum', icon: '🎰' },
    { id: 11, name: 'Элитный', price: 200, minWin: 100, maxWin: 600, rarity: 'platinum', icon: '💼' },
    { id: 12, name: 'Мастер', price: 300, minWin: 150, maxWin: 1200, rarity: 'legendary', icon: '🔥' },
    { id: 13, name: 'Магический', price: 500, minWin: 250, maxWin: 2000, rarity: 'legendary', icon: '✨' },
    { id: 14, name: 'Королевский', price: 750, minWin: 400, maxWin: 3000, rarity: 'legendary', icon: '👑' },
    { id: 15, name: 'Божественный', price: 1000, minWin: 500, maxWin: 5000, rarity: 'legendary', icon: '⚜️' },
  ];

  const topPlayers: TopPlayer[] = [
    { id: 1, name: 'GoldenKing', balance: 15420, totalWins: 342 },
    { id: 2, name: 'LuckyDiamond', balance: 12850, totalWins: 298 },
    { id: 3, name: 'CasinoMaster', balance: 10230, totalWins: 256 },
    { id: 4, name: 'RichPlayer', balance: 8950, totalWins: 189 },
    { id: 5, name: 'MegaWinner', balance: 7640, totalWins: 167 },
    { id: 6, name: 'ProGamer', balance: 6320, totalWins: 145 },
    { id: 7, name: 'SpinMaster', balance: 5100, totalWins: 123 },
    { id: 8, name: 'FortuneHunter', balance: 4250, totalWins: 98 },
    { id: 9, name: 'VIPPlayer', balance: 3680, totalWins: 87 },
    { id: 10, name: 'EliteGambler', balance: 2950, totalWins: 76 },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'from-orange-900/20 to-orange-700/20 border-orange-700/50';
      case 'silver': return 'from-slate-700/20 to-slate-500/20 border-slate-500/50';
      case 'gold': return 'from-yellow-600/20 to-yellow-400/20 border-yellow-500/50 glow-gold';
      case 'platinum': return 'from-cyan-600/20 to-cyan-400/20 border-cyan-500/50';
      case 'legendary': return 'from-purple-600/20 to-pink-500/20 border-purple-500/50 animate-pulse-glow';
      default: return 'from-gray-700/20 to-gray-600/20 border-gray-600/50';
    }
  };

  const handleOpenSecretCase = () => {
    if (balance < 1) {
      toast.error('Недостаточно средств на балансе!');
      return;
    }

    const secretCase: CaseType = {
      id: 999,
      name: 'Секретный',
      price: balance,
      minWin: 0,
      maxWin: balance * 10,
      rarity: 'legendary',
      icon: '🎁'
    };

    setBalance(0);
    setOpenCase(secretCase);
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      let lossPenalty = 0;
      if (totalProfit > 100) {
        lossPenalty = Math.min(0.3, (totalProfit - 100) / 1000);
      }
      
      const baseRange = secretCase.maxWin - secretCase.minWin;
      const lossZone = Math.floor(baseRange * lossPenalty);
      const adjustedMin = secretCase.minWin;
      const adjustedMax = secretCase.maxWin - lossZone;
      
      const winAmount = Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
      const netProfit = winAmount - secretCase.price;
      
      setSpinResult(winAmount);
      setBalance(prev => prev + winAmount);
      setTotalProfit(prev => prev + netProfit);
      setIsSpinning(false);

      const historyItem: HistoryItem = {
        id: Date.now(),
        caseName: secretCase.name,
        amount: netProfit,
        result: netProfit > 0 ? 'win' : 'loss',
        timestamp: new Date(),
      };
      setHistory(prev => [historyItem, ...prev].slice(0, 50));

      if (netProfit > 0) {
        toast.success(`Поздравляем! Вы выиграли ${winAmount}₽ (+${netProfit}₽)`);
      } else {
        toast.error(`Получено ${winAmount}₽ (${netProfit}₽)`);
      }
    }, 3000);
  };

  const handleOpenCase = (caseItem: CaseType) => {
    if (balance < caseItem.price) {
      toast.error('Недостаточно средств на балансе!');
      return;
    }

    setBalance(prev => prev - caseItem.price);
    setOpenCase(caseItem);
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      let lossPenalty = 0;
      if (totalProfit > 100) {
        lossPenalty = Math.min(0.3, (totalProfit - 100) / 1000);
      }
      
      const baseRange = caseItem.maxWin - caseItem.minWin;
      const lossZone = Math.floor(baseRange * lossPenalty);
      const adjustedMin = caseItem.minWin;
      const adjustedMax = caseItem.maxWin - lossZone;
      
      const winAmount = Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
      const netProfit = winAmount - caseItem.price;
      
      setSpinResult(winAmount);
      setBalance(prev => prev + winAmount);
      setTotalProfit(prev => prev + netProfit);
      setIsSpinning(false);

      const historyItem: HistoryItem = {
        id: Date.now(),
        caseName: caseItem.name,
        amount: netProfit,
        result: netProfit > 0 ? 'win' : 'loss',
        timestamp: new Date(),
      };
      setHistory(prev => [historyItem, ...prev].slice(0, 50));

      if (netProfit > 0) {
        toast.success(`Поздравляем! Вы выиграли ${winAmount}₽ (+${netProfit}₽)`);
      } else {
        toast.error(`Получено ${winAmount}₽ (${netProfit}₽)`);
      }
    }, 3000);
  };

  const handleDeposit = (method: string) => {
    toast.success(`Перенаправление на ${method}...`);
    setPaymentDialog(false);
  };

  const handleWithdraw = () => {
    toast.success('Заявка на вывод средств принята!');
    setWithdrawDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎰</div>
              <h1 className="text-2xl md:text-3xl font-bold glow-gold-text text-primary">CaseLuxe</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Card className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
                <div className="flex items-center gap-2">
                  <Icon name="Wallet" className="text-primary" size={20} />
                  <span className="font-bold text-lg text-primary">{balance.toFixed(2)}₽</span>
                </div>
              </Card>
              
              <Button onClick={() => setPaymentDialog(true)} className="bg-primary hover:bg-primary/90 text-black font-semibold">
                <Icon name="Plus" size={18} />
                Пополнить
              </Button>
              
              <Button variant="outline" onClick={() => setWithdrawDialog(true)} className="border-primary/50 text-primary hover:bg-primary/10">
                <Icon name="ArrowUpRight" size={18} />
                Вывести
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cases" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card border border-primary/20">
            <TabsTrigger value="cases">Кейсы</TabsTrigger>
            <TabsTrigger value="leaderboard">Топ игроков</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold glow-gold-text">Выберите кейс</h2>
              <p className="text-muted-foreground">Откройте кейс и выиграйте до 5000₽</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {balance >= 1 && (
                <Card 
                  className="p-6 bg-gradient-to-br from-red-600/20 to-purple-600/20 border-2 border-red-500/50 hover:scale-105 transition-all duration-300 cursor-pointer group animate-pulse-glow"
                  onClick={handleOpenSecretCase}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl group-hover:scale-110 transition-transform">🎰</div>
                    <h3 className="font-bold text-lg text-red-400">Секретный</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Выигрыш: 0₽ - {(balance * 10).toFixed(0)}₽</p>
                      <p className="text-xs text-red-400">Всё или ничего!</p>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
                      Ва-банк {balance.toFixed(2)}₽
                    </Button>
                  </div>
                </Card>
              )}
              
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id}
                  className={`p-6 bg-gradient-to-br ${getRarityColor(caseItem.rarity)} border-2 hover:scale-105 transition-all duration-300 cursor-pointer group`}
                  onClick={() => handleOpenCase(caseItem)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl group-hover:scale-110 transition-transform">{caseItem.icon}</div>
                    <h3 className="font-bold text-lg">{caseItem.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Выигрыш: {caseItem.minWin}₽ - {caseItem.maxWin}₽</p>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold">
                      Открыть за {caseItem.price}₽
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold glow-gold-text">Топ игроков</h2>
              <p className="text-muted-foreground">Лучшие игроки нашей платформы</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {topPlayers.map((player, index) => (
                <Card 
                  key={player.id}
                  className={`p-4 bg-gradient-to-r ${
                    index === 0 ? 'from-yellow-600/20 to-yellow-400/20 border-yellow-500/50' :
                    index === 1 ? 'from-slate-600/20 to-slate-400/20 border-slate-500/50' :
                    index === 2 ? 'from-orange-600/20 to-orange-400/20 border-orange-500/50' :
                    'from-card/50 to-card border-border'
                  } border-2`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{player.name}</p>
                        <p className="text-sm text-muted-foreground">Побед: {player.totalWins}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-primary">{player.balance.toLocaleString()}₽</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold glow-gold-text">История открытий</h2>
              <p className="text-muted-foreground">Ваши последние 50 открытий кейсов</p>
            </div>

            {history.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">История пуста. Откройте первый кейс!</p>
              </Card>
            ) : (
              <div className="max-w-3xl mx-auto space-y-2">
                {history.map((item) => (
                  <Card key={item.id} className="p-4 bg-card/50 border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon 
                          name={item.result === 'win' ? 'TrendingUp' : 'TrendingDown'} 
                          className={item.result === 'win' ? 'text-green-500' : 'text-red-500'}
                          size={24}
                        />
                        <div>
                          <p className="font-semibold">{item.caseName}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleTimeString('ru-RU')}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold text-lg ${item.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.amount > 0 ? '+' : ''}{item.amount}₽
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <CaseOpeningDialog
        openCase={openCase}
        isSpinning={isSpinning}
        spinResult={spinResult}
        onClose={() => setOpenCase(null)}
      />

      <PaymentDialogs
        paymentDialog={paymentDialog}
        withdrawDialog={withdrawDialog}
        balance={balance}
        totalProfit={totalProfit}
        onClosePayment={() => setPaymentDialog(false)}
        onCloseWithdraw={() => setWithdrawDialog(false)}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
      />

      <footer className="border-t border-primary/20 bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-primary mb-3">О платформе</h3>
              <p className="text-sm text-muted-foreground">
                CaseLuxe - премиальная платформа для открытия кейсов с честной системой выигрышей
              </p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-3">Поддержка</h3>
              <p className="text-sm text-muted-foreground">support@caseluxe.com</p>
              <p className="text-sm text-muted-foreground">Telegram: @caseluxe_support</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-3">Правила</h3>
              <p className="text-sm text-muted-foreground">Пользовательское соглашение</p>
              <p className="text-sm text-muted-foreground">Политика конфиденциальности</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
