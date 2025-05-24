"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  ArrowRight,
  Target,
  BarChart3,
  Trophy,
  Zap
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: Array<{
    text: string;
    score: number;
  }>;
}

interface FormData {
  name: string;
  email: string;
  answers: Record<string, number>;
}

const questions: Question[] = [
  {
    id: 'processes',
    question: '¿Cómo manejás los procesos en tu empresa?',
    options: [
      { text: 'Cada empleado hace las cosas a su manera', score: 1 },
      { text: 'Tenemos algunos procesos documentados', score: 2 },
      { text: 'La mayoría de procesos están estandarizados', score: 3 },
      { text: 'Todos los procesos están optimizados y automatizados', score: 4 }
    ]
  },
  {
    id: 'data',
    question: '¿Qué tan centralizada tenés la información?',
    options: [
      { text: 'Datos dispersos en Excel, WhatsApp y papel', score: 1 },
      { text: 'Usamos algunas herramientas digitales básicas', score: 2 },
      { text: 'Tenemos sistemas integrados pero falta conexión', score: 3 },
      { text: 'Dashboard centralizado con datos en tiempo real', score: 4 }
    ]
  },
  {
    id: 'automation',
    question: '¿Cuántas tareas tenés automatizadas?',
    options: [
      { text: 'Todo es manual, nada automatizado', score: 1 },
      { text: 'Algunas notificaciones automáticas básicas', score: 2 },
      { text: 'Automatizamos reportes y algunos workflows', score: 3 },
      { text: 'La mayoría de tareas repetitivas están automatizadas', score: 4 }
    ]
  },
  {
    id: 'decisions',
    question: '¿Cómo tomás las decisiones importantes?',
    options: [
      { text: 'Basándome en intuición y experiencia', score: 1 },
      { text: 'Reviso algunos números básicos ocasionalmente', score: 2 },
      { text: 'Analizo reportes regulares con KPIs', score: 3 },
      { text: 'Decisiones basadas en análisis predictivo y datos', score: 4 }
    ]
  },
  {
    id: 'team',
    question: '¿Cómo funciona tu equipo con la tecnología?',
    options: [
      { text: 'Resistencia al cambio, prefieren métodos tradicionales', score: 1 },
      { text: 'Usan herramientas básicas pero sin integración', score: 2 },
      { text: 'Adaptados a nuevas herramientas con capacitación', score: 3 },
      { text: 'Equipo proactivo adoptando nuevas tecnologías', score: 4 }
    ]
  }
];

export default function MaturityScoreSection() {
  const [currentStep, setCurrentStep] = useState<'form' | 'questions' | 'result'>('form');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    answers: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setCurrentStep('questions');
    }
  };

  const handleAnswer = (questionId: string, score: number) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: score }
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate final score
      const totalScore = Object.values({ ...formData.answers, [questionId]: score })
        .reduce((sum, s) => sum + s, 0);
      const finalScore = Math.round((totalScore / (questions.length * 4)) * 100);
      setScore(finalScore);
      setCurrentStep('result');
    }
  };

  const getScoreMessage = (score: number) => {
    if (score <= 30) {
      return {
        level: 'Inicial',
        color: 'text-red-600',
        bg: 'bg-red-50',
        message: 'Tu empresa tiene mucho potencial de optimización. Podríamos generar un impacto inmediato.',
        recommendations: [
          'Mapeo urgente de procesos críticos',
          'Centralización básica de datos',
          'Automatización de tareas más repetitivas'
        ]
      };
    } else if (score <= 60) {
      return {
        level: 'En desarrollo',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        message: 'Tenés una base sólida, pero hay oportunidades claras de mejora significativa.',
        recommendations: [
          'Integración de sistemas existentes',
          'Automatización de workflows complejos',
          'Dashboard ejecutivo con KPIs clave'
        ]
      };
    } else if (score <= 85) {
      return {
        level: 'Avanzado',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        message: 'Estás bien encaminado. Podemos llevarte al siguiente nivel con optimizaciones específicas.',
        recommendations: [
          'IA predictiva para toma de decisiones',
          'Automatización avanzada con machine learning',
          'Optimización de procesos con análisis de datos'
        ]
      };
    } else {
      return {
        level: 'Líder digital',
        color: 'text-green-600',
        bg: 'bg-green-50',
        message: '¡Excelente! Sos un referente. Podemos ayudarte a mantener esa ventaja competitiva.',
        recommendations: [
          'Innovación continua con nuevas tecnologías',
          'Expansión de automatización a nuevas áreas',
          'Benchmarking y optimización avanzada'
        ]
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const scoreData = getScoreMessage(score);

  if (currentStep === 'result') {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-card/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-border/50">
            <CardContent className="p-12">
              <Trophy className="w-16 h-16 text-signalYellow mx-auto mb-6" />
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                ¡Gracias {formData.name}!
              </h2>
              
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2" style={{ color: scoreData.color.replace('text-', '') }}>
                  {score}%
                </div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${scoreData.bg} ${scoreData.color}`}>
                  Nivel: {scoreData.level}
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                {scoreData.message}
              </p>

              <div className="bg-muted/50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">
                  Recomendaciones inmediatas para tu empresa:
                </h3>
                <ul className="space-y-2 text-left">
                  {scoreData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-brilliantBlue flex-shrink-0" />
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong>En las próximas 24hs te enviamos:</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-brilliantBlue" />
                    <span>Análisis detallado de tu score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-brilliantBlue" />
                    <span>Plan de acción personalizado</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-8 bg-brilliantBlue hover:bg-brilliantBlue/90 text-white px-8 py-4 text-lg font-semibold rounded-full"
              >
                Quiero el diagnóstico completo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-signalYellow text-neutral-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Assessment Gratuito
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            ¿Qué tan{" "}
            <span className="text-brilliantBlue">
              madura digitalmente
            </span>{" "}
            está tu PyME?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubrí en 2 minutos el nivel de optimización de tu empresa y recibí recomendaciones personalizadas
          </p>
        </div>

        <Card className="bg-card/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-border/50">
          {currentStep === 'form' ? (
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Empezamos con tus datos básicos
                </h3>
                <p className="text-muted-foreground">
                  Para personalizar tu reporte de madurez digital
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6 max-w-md mx-auto">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brilliantBlue"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email corporativo"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brilliantBlue"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-brilliantBlue hover:bg-brilliantBlue/90 text-white py-4 text-lg font-semibold rounded-full"
                >
                  Comenzar assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          ) : (
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Pregunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <span className="text-sm font-medium text-brilliantBlue">
                    {Math.round(progress)}% completado
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-center">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.score)}
                      className="p-4 text-left bg-muted/50 hover:bg-brilliantBlue/10 border border-border hover:border-brilliantBlue/30 rounded-2xl transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-brilliantBlue/30 group-hover:border-brilliantBlue flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-brilliantBlue/0 group-hover:bg-brilliantBlue transition-colors"></div>
                        </div>
                        <span className="text-foreground group-hover:text-brilliantBlue transition-colors">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Tus datos están seguros. Solo los usamos para personalizar tu reporte.
          </p>
        </div>
      </div>
    </section>
  );
} 