import { useState } from "react";
import { cn } from "@/lib/utils";

const questions = [
  "Qual era a principal fonte de riqueza para os fisiocratas?",
  "Quem foi o principal teórico da Fisiocracia?",
  "Em que século surgiu a Fisiocracia na França?",
  "Como os fisiocratas chamavam a classe que trabalhava na agricultura?",
  "Qual era o nome dado à classe dos comerciantes e artesãos?",
  "Quem eram os proprietários de terras segundo os fisiocratas?",
  "Qual princípio econômico defendido pelos fisiocratas significa 'deixar fazer'?",
  "Que tipo de imposto os fisiocratas defendiam?",
  "Como se chamava a obra principal de François Quesnay?",
  "Qual doutrina econômica a Fisiocracia se opunha?",
  "Que sistema político dominava a França na época dos fisiocratas?",
  "Qual era a filosofia econômica geral defendida pelos fisiocratas?",
  "Como os fisiocratas viam o comércio internacional?",
  "Que tipo de política comercial os fisiocratas rejeitavam?",
  "Como os fisiocratas definiam o conceito de 'ordem natural'?"
];

export const TeacherPanel = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const answers = [
    "Agricultura",
    "François Quesnay",
    "Século XVIII",
    "Classe produtiva",
    "Classe estéril", 
    "Proprietários",
    "Laissez-faire",
    "Imposto único",
    "Quadro econômico",
    "Mercantilismo",
    "Absolutismo",
    "Liberalismo econômico",
    "Comércio",
    "Protecionismo",
    "Ordem natural"
  ];

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
  };

  const previousQuestion = () => {
    setCurrentQuestion((prev) => (prev - 1 + questions.length) % questions.length);
    setShowAnswer(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className={cn(
        "bg-gradient-to-br from-education-primary/10 to-education-secondary/10",
        "border border-education-primary/20 rounded-xl p-6",
        "shadow-[var(--shadow-card)]"
      )}>
        <h2 className="text-2xl font-bold text-education-primary mb-6 text-center">
          📚 Painel do Professor
        </h2>
        
        <div className="mb-4 text-center">
          <span className="text-sm text-muted-foreground">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
        </div>

        <div className="bg-card rounded-lg p-6 mb-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            {questions[currentQuestion]}
          </h3>
          
          {showAnswer && (
            <div className="mt-4 p-4 bg-bingo-marked/10 rounded-lg border border-bingo-marked/30">
              <p className="text-bingo-marked font-medium">
                <strong>Resposta:</strong> {answers[currentQuestion]}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={previousQuestion}
            className={cn(
              "px-4 py-2 rounded-lg font-medium",
              "bg-secondary text-secondary-foreground",
              "hover:bg-secondary/80 transition-colors duration-200",
              "border border-border"
            )}
          >
            ← Anterior
          </button>
          
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={cn(
              "px-6 py-2 rounded-lg font-medium",
              "bg-education-primary text-white",
              "hover:bg-education-primary/90 transition-colors duration-200",
              "shadow-md"
            )}
          >
            {showAnswer ? "Ocultar" : "Ver"} Resposta
          </button>
          
          <button
            onClick={nextQuestion}
            className={cn(
              "px-4 py-2 rounded-lg font-medium",
              "bg-secondary text-secondary-foreground",
              "hover:bg-secondary/80 transition-colors duration-200",
              "border border-border"
            )}
          >
            Próxima →
          </button>
        </div>
      </div>
    </div>
  );
};