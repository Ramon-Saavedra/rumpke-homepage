import {
  MessageCircle,
  Handshake,
  FileSignature,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStepItem {
  subtitle: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  label: string;
  title: string;
  icon: LucideIcon;
  items: ProcessStepItem[];
}

export const TYPEWRITER_PHRASES = [
  "Von der Beratung bis zur Schlüsselübergabe",
  "Transparent. Persönlich. Erfolgreich.",
  "In 3 Schritten zu Ihrer Traumimmobilie",
] as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    label: "01",
    title: "Erstgespräch & Bewertung",
    icon: MessageCircle,
    items: [
      {
        subtitle: "Erstgespräch",
        description:
          "In einem unverbindlichen Gespräch lernen wir Ihre Wünsche und Ziele kennen. Gemeinsam legen wir die Strategie für Ihren Immobilienprozess fest.",
      },
      {
        subtitle: "Bewertung",
        description:
          "Wir ermitteln den realistischen Marktwert Ihrer Immobilie auf Basis aktueller Marktdaten und unserer lokalen Expertise.",
      },
    ],
  },
  {
    id: 2,
    label: "02",
    title: "Vermarktung & Verhandlung",
    icon: Handshake,
    items: [
      {
        subtitle: "Vermarktung",
        description:
          "Professionelles Exposé, gezielte Ansprache vorgemerkter Interessenten und Präsenz auf den relevanten Portalen — Ihre Immobilie in bestem Licht.",
      },
      {
        subtitle: "Verhandlung",
        description:
          "Wir führen Besichtigungen durch, prüfen Interessenten sorgfältig und verhandeln in Ihrem Sinne das bestmögliche Ergebnis.",
      },
    ],
  },
  {
    id: 3,
    label: "03",
    title: "Notar & After Sales Services",
    icon: FileSignature,
    items: [
      {
        subtitle: "Notar",
        description:
          "Beim Notartermin werden alle Verträge rechtssicher beurkundet — wir begleiten Sie persönlich durch jeden Schritt bis zur Schlüsselübergabe.",
      },
      {
        subtitle: "After Sales Services",
        description:
          "Auch nach der Schlüsselübergabe bleiben wir Ihr Ansprechpartner — für Fragen rund um Ihre Immobilie und alles, was danach kommt.",
      },
    ],
  },
];
