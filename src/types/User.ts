import { User } from "firebase/auth";

export interface CustomUser extends User {
  department?: string;
  // Ajoutez d'autres champs personnalisés si nécessaire
}