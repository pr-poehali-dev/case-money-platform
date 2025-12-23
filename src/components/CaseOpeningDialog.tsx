import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CaseType } from '@/types';

type CaseOpeningDialogProps = {
  openCase: CaseType | null;
  isSpinning: boolean;
  spinResult: number | null;
  onClose: () => void;
};

const CaseOpeningDialog = ({ openCase, isSpinning, spinResult, onClose }: CaseOpeningDialogProps) => {
  return (
    <Dialog open={!!openCase} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center glow-gold-text">
            {openCase?.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-8">
          {isSpinning ? (
            <div className="text-center space-y-6">
              <div className="text-8xl animate-bounce">{openCase?.icon}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
                <p className="text-xl font-semibold text-primary">Открытие кейса...</p>
              </div>
            </div>
          ) : spinResult !== null ? (
            <div className="text-center space-y-6">
              <div className="text-8xl">{openCase?.icon}</div>
              <div className="space-y-3">
                <p className="text-3xl font-bold text-primary glow-gold-text">{spinResult}₽</p>
                <p className={`text-xl font-semibold ${
                  (spinResult - (openCase?.price || 0)) > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {(spinResult - (openCase?.price || 0)) > 0 ? '+' : ''}
                  {spinResult - (openCase?.price || 0)}₽
                </p>
                <Button 
                  onClick={onClose}
                  className="mt-4 bg-primary hover:bg-primary/90 text-black font-bold"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseOpeningDialog;
