
// Version mockée - À remplacer plus tard par la vraie implémentation
export const auth = {
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Simule un utilisateur non connecté
    callback(null);
    return () => {}; // Fonction de nettoyage
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Simule une connexion réussie après 1 seconde
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: { email } };
  }
};

export const db = {
  // Mock des fonctions Firestore si nécessaire
};