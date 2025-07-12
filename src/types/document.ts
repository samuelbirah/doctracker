export interface Doc {
  id: string;
  title: string;
  emitter?: string;
  recipients?: string[];
  status: "Nouveau" | "En traitement" | "Traité" | "Archivé";
  createdAt?: Date;
  history?: {
    date: Date;
    action: string;
    by: string;
  }[];
}