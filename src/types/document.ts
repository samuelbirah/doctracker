export interface Document {
  id: string;
  title: string;
  emitter?: string;
  recipients?: string[];
  status: "Nouveau" | "En traitement" | "Traité" | "Archivé";
  createdAt?: Date;
}