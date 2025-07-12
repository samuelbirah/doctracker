import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../services/firebase';
import { CustomUser } from '../types/User';

interface AuthContextType {
  currentUser: CustomUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user as CustomUser);
      setLoading(false);
      // SUPPRIMEZ la redirection automatique ici
    });

    return unsubscribe;
  }, []); // Retirez navigate des dépendances

  const logout = async () => {
    try {
      await firebaseAuth.signOut();
      // La redirection après logout doit être gérée dans le composant
    } catch (error) {
      console.error('Logout error:', error);
      throw error; // Permet de gérer l'erreur dans le composant
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};