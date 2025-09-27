import { useState, useEffect } from "react";
import { BingoCard } from "./BingoCard";
import { TeacherPanel } from "./TeacherPanel";
import { GroupSelector } from "./GroupSelector";
import { useToast } from "@/hooks/use-toast";

const BINGO_WORDS = [
  "Agricultura", "Terra", "Produto líquido", "Imposto único", "Classe produtiva",
  "Classe estéril", "Proprietários", "Liberalismo econômico", "Laissez-faire",
  "França séc. XVIII", "Mercantilismo", "Absolutismo", "François Quesnay",
  "Quadro econômico", "Ordem natural", "Comércio", "Impostos", "Protecionismo",
  "Fonte da riqueza", "Renda"
];

// Generate 4 different bingo cards
const generateBingoCards = (): string[][] => {
  const cards: string[][] = [];
  
  for (let cardIndex = 0; cardIndex < 4; cardIndex++) {
    const shuffled = [...BINGO_WORDS].sort(() => Math.random() - 0.5);
    cards.push(shuffled.slice(0, 16));
  }
  
  return cards;
};

export const BingoGame = () => {
  const [bingoCards] = useState<string[][]>(() => generateBingoCards());
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showTeacherPanel, setShowTeacherPanel] = useState(false);
  const [winners, setWinners] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const handleBingo = () => {
    if (selectedGroup && !winners.has(selectedGroup)) {
      setWinners(prev => new Set([...prev, selectedGroup]));
      
      // Celebration effect
      setTimeout(() => {
        toast({
          title: "🏆 PARABÉNS!",
          description: `Grupo ${selectedGroup} fez BINGO! Excelente conhecimento sobre Fisiocracia!`,
          duration: 8000,
        });
      }, 500);
    }
  };

  const resetAllCards = () => {
    setWinners(new Set());
    setSelectedGroup(null);
    toast({
      title: "🔄 Jogo Reiniciado",
      description: "Todas as cartelas foram limpas. Bom jogo!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-education-secondary to-education-primary bg-clip-text text-transparent mb-4">
            Bingo Educacional
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-2">
            Fisiocracia
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Aprenda sobre a escola econômica francesa do século XVIII de forma interativa!
          </p>
        </header>

        <GroupSelector
          selectedGroup={selectedGroup}
          onGroupSelect={setSelectedGroup}
          showTeacherPanel={showTeacherPanel}
          onToggleTeacherPanel={() => setShowTeacherPanel(!showTeacherPanel)}
        />

        {showTeacherPanel && <TeacherPanel />}

        {selectedGroup && !showTeacherPanel && (
          <div className="mt-8">
            <BingoCard
              words={bingoCards[selectedGroup - 1]}
              groupNumber={selectedGroup}
              onBingo={handleBingo}
            />
            
            {winners.has(selectedGroup) && (
              <div className="mt-6 text-center">
                <div className="inline-block p-4 bg-bingo-winner/20 border-2 border-bingo-winner rounded-lg shadow-[var(--shadow-winner)]">
                  <span className="text-2xl">🏆</span>
                  <p className="text-lg font-bold text-bingo-winner mt-2">
                    BINGO! Parabéns Grupo {selectedGroup}!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedGroup && !showTeacherPanel && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl text-muted-foreground">
              Selecione seu grupo ou acesse o painel do professor para começar!
            </p>
          </div>
        )}

        {winners.size > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={resetAllCards}
              className="px-8 py-3 rounded-lg font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200 shadow-md"
            >
              🔄 Reiniciar Jogo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};