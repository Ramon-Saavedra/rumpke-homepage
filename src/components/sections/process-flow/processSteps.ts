import {
  MessageCircle,
  BarChart2,
  Search,
  Handshake,
  Key,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TYPEWRITER_PHRASES = [
  "Von der Beratung bis zur Schlüsselübergabe",
  "Transparent. Persönlich. Erfolgreich.",
  "5 Schritte zu Ihrer Traumimmobilie",
] as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    label: "01",
    title: "Erstgespräch",
    description:
      "In einem unverbindlichen Gespräch lernen wir Ihre Wünsche und Ziele kennen. Gemeinsam legen wir die Strategie für Ihren Immobilienprozess fest.",
    icon: MessageCircle,
  },
  {
    id: 2,
    label: "02",
    title: "Bewertung",
    description:
      "Wir ermitteln den realistischen Marktwert Ihrer Immobilie auf Basis aktueller Marktdaten und unserer lokalen Expertise.",
    icon: BarChart2,
  },
  {
    id: 3,
    label: "03",
    title: "Vermarktung",
    description:
      "Professionelles Exposé, gezielte Ansprache vorgemerkter Interessenten und Präsenz auf den relevanten Portalen — Ihre Immobilie in bestem Licht.",
    icon: Search,
  },
  {
    id: 4,
    label: "04",
    title: "Verhandlung",
    description:
      "Wir führen Besichtigungen durch, prüfen Interessenten sorgfältig und verhandeln in Ihrem Sinne das bestmögliche Ergebnis.",
    icon: Handshake,
  },
  {
    id: 5,
    label: "05",
    title: "Schlüsselübergabe",
    description:
      "Nach dem Notartermin und der Kaufpreiszahlung übergeben wir die Schlüssel — Ihr Ziel ist erreicht. Wir bleiben auch danach Ihr Ansprechpartner.",
    icon: Key,
  },
];
