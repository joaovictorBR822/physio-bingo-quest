import { cn } from "@/lib/utils";

interface BingoCellProps {
  word: string;
  isMarked: boolean;
  onClick: () => void;
}

export const BingoCell = ({ word, isMarked, onClick }: BingoCellProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square p-2 rounded-lg border-2 border-border",
        "flex items-center justify-center text-center",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-md hover:scale-105",
        "text-xs sm:text-sm font-medium leading-tight",
        "min-h-[80px] sm:min-h-[100px]",
        isMarked
          ? "bg-bingo-marked text-bingo-marked-foreground border-bingo-marked shadow-[var(--shadow-marked)] scale-95"
          : "bg-bingo-card text-card-foreground hover:bg-bingo-hover border-border shadow-[var(--shadow-card)]"
      )}
    >
      <span className="break-words px-1">{word}</span>
    </button>
  );
};