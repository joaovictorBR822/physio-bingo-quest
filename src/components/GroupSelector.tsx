import { cn } from "@/lib/utils";

interface GroupSelectorProps {
  selectedGroup: number | null;
  onGroupSelect: (group: number) => void;
  showTeacherPanel: boolean;
  onToggleTeacherPanel: () => void;
}

export const GroupSelector = ({
  selectedGroup,
  onGroupSelect,
  showTeacherPanel,
  onToggleTeacherPanel,
}: GroupSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {[1, 2, 3, 4].map((group) => (
        <button
          key={group}
          onClick={() => onGroupSelect(group)}
          className={cn(
            "px-6 py-3 rounded-lg font-semibold transition-all duration-300",
            "border-2 shadow-md hover:shadow-lg hover:scale-105",
            selectedGroup === group
              ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-marked)]"
              : "bg-card text-card-foreground border-border hover:bg-primary/10 hover:border-primary/50"
          )}
        >
          Grupo {group}
        </button>
      ))}
      
      <button
        onClick={onToggleTeacherPanel}
        className={cn(
          "px-6 py-3 rounded-lg font-semibold transition-all duration-300",
          "border-2 shadow-md hover:shadow-lg hover:scale-105",
          showTeacherPanel
            ? "bg-education-primary text-white border-education-primary"
            : "bg-education-primary/10 text-education-primary border-education-primary/50 hover:bg-education-primary hover:text-white"
        )}
      >
        👨‍🏫 Painel Professor
      </button>
    </div>
  );
};