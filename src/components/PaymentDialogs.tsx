import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type PaymentDialogsProps = {
  paymentDialog: boolean;
  withdrawDialog: boolean;
  balance: number;
  totalProfit: number;
  onClosePayment: () => void;
  onCloseWithdraw: () => void;
  onDeposit: (method: string) => void;
  onWithdraw: () => void;
};

const PaymentDialogs = ({
  paymentDialog,
  withdrawDialog,
  balance,
  totalProfit,
  onClosePayment,
  onCloseWithdraw,
  onDeposit,
  onWithdraw
}: PaymentDialogsProps) => {
  return (
    <>
      <Dialog open={paymentDialog} onOpenChange={onClosePayment}>
        <DialogContent className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold glow-gold-text">Пополнение баланса</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <Button 
              onClick={() => onDeposit('Яндекс.Кассу')}
              className="w-full h-14 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-bold text-lg"
            >
              <Icon name="Wallet" size={24} />
              Яндекс.Касса
            </Button>
            
            <Button 
              onClick={() => onDeposit('Сбербанк')}
              className="w-full h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg"
            >
              <Icon name="CreditCard" size={24} />
              Сбербанк
            </Button>
            
            <Button 
              onClick={() => onDeposit('Криптовалюту')}
              className="w-full h-14 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-white font-bold text-lg"
            >
              <Icon name="Bitcoin" size={24} />
              Криптовалюта
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={withdrawDialog} onOpenChange={onCloseWithdraw}>
        <DialogContent className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold glow-gold-text">Вывод средств</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <div className="p-4 bg-card/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Текущий баланс:</p>
                <p className="text-2xl font-bold text-foreground">{balance.toFixed(2)}₽</p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Доступно для вывода (чистая прибыль):</p>
                <p className="text-3xl font-bold text-primary">{totalProfit > 0 ? totalProfit.toFixed(2) : '0.00'}₽</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={onWithdraw}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold"
                disabled={totalProfit < 100}
              >
                Вывести на карту (мин. 100₽)
              </Button>
              
              <Button 
                onClick={onWithdraw}
                className="w-full h-12 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-white font-bold"
                disabled={totalProfit < 50}
              >
                Вывести в крипту (мин. 50₽)
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Вывод обрабатывается в течение 24 часов
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentDialogs;
