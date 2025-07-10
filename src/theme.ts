import { ThemeConfig } from "antd";

export const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#09459C",         // Bleu principal REGIDESO
    colorPrimaryHover: "#284063",    // Bleu foncé au survol
    colorInfo: "#739EDE",            // Bleu secondaire
    colorTextSecondary: "#284063",   // Texte secondaire
    colorBgContainer: "#FBF9F6",     // Fond des inputs
    colorBorder: "#E0E0E0",          // Bordure légère
    colorError: "#F44336",           // Couleur d'erreur
    borderRadius: 8,                 // Bords arrondis
    fontSize: 14,                    // Taille de base
    colorLink: "#739EDE",            // Liens
    colorLinkHover: "#09459C",       // Liens au survol
  },
  components: {
    Button: {
      controlHeight: 40,             // Hauteur des boutons
      fontWeight: 500,               // Gras moyen
    },
    Card: {
      borderRadiusLG: 12,            // Arrondi des cartes
      boxShadow: "0 6px 16px rgba(9, 69, 156, 0.1)", // Ombre douce
    },
    Input: {
      controlHeight: 40,             // Hauteur des inputs
    },
  },
};