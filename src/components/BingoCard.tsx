import { useState, useEffect } from "react";
import { BingoCell } from "./BingoCell";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BingoCardProps {
  words: string[];
  groupNumber: number;
  onBingo: () => void;
}

export const BingoCard = ({ words, groupNumber, onBingo }: BingoCardProps) => {
  const [markedCells, setMarkedCells] = useState<boolean[]>(new Array(16).fill(false));
  const { toast } = useToast();

  const checkBingo = (marked: boolean[]): boolean => {
    // Check rows
    for (let i = 0; i < 4; i++) {
      if (marked.slice(i * 4, i * 4 + 4).every(Boolean)) return true;
    }

    // Check columns
    for (let i = 0; i < 4; i++) {
      if (marked.filter((_, index) => index % 4 === i).every(Boolean)) return true;
    }

    // Check diagonals
    if ([0, 5, 10, 15].every(i => marked[i])) return true;
    if ([3, 6, 9, 12].every(i => marked[i])) return true;

    return false;
  };

  const toggleCell = (index: number) => {
    const newMarkedCells = [...markedCells];
    newMarkedCells[index] = !newMarkedCells[index];
    setMarkedCells(newMarkedCells);

    if (checkBingo(newMarkedCells)) {
      setTimeout(() => {
        toast({
          title: "🎉 BINGO!",
          description: `Grupo ${groupNumber} completou uma linha!`,
          duration: 5000,
        });
        onBingo();
      }, 300);
    }
  };

  const resetCard = () => {
    setMarkedCells(new Array(16).fill(false));
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Grupo {groupNumber}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-education-secondary mx-auto rounded-full"></div>
      </div>
      
      <div className={cn(
        "grid grid-cols-4 gap-2 p-4 rounded-xl",
        "bg-gradient-to-br from-card to-secondary/30",
        "shadow-[var(--shadow-card)] border border-border/50"
      )}>
        {words.map((word, index) => (
          <BingoCell
            key={index}
            word={word}
            isMarked={markedCells[index]}
            onClick={() => toggleCell(index)}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={resetCard}
          className={cn(
            "px-6 py-2 rounded-lg font-medium",
            "bg-secondary text-secondary-foreground",
            "hover:bg-secondary/80 transition-colors duration-200",
            "border border-border"
          )}
        >
          Resetar Cartela
        </button>
      </div>
    </div>
  );
};