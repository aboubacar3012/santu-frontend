import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'my-background': '#eeeeee',
        'my-slate': '#313d4c',
        'my-blush': '#feeeed',
        'my-pink': '#f4b7c9',
        // 'my-lavender': '#868CFF',
        // 'my-indigo': '#4318FF',

        // Nouvelle palette pour application de facturation
        finance: {
          primary: '#1E4DD8', // Bleu primaire (comme Qonto)
          secondary: '#0A83FF', // Bleu secondaire plus clair
          tertiary: '#00B2A9', // Turquoise/Teal (accent)

          // Neutres
          'bg-light': '#F7F9FC', // Fond clair
          'bg-medium': '#EDF2F7', // Fond gris très clair
          surface: '#FFFFFF', // Surface des cartes
          border: '#E2E8F0', // Bordures

          // Textes
          'text-primary': '#2D3748', // Texte principal
          'text-secondary': '#718096', // Texte secondaire

          // Fonctionnels
          success: '#38B2AC', // Vert succès
          warning: '#F6AD55', // Orange avertissement
          error: '#E53E3E', // Rouge erreur
          info: '#63B3ED', // Bleu info
          highlight: '#FFEB3B', // Jaune surlignage

          // Accent
          accent: '#805AD5', // Violet accent (pour boutons secondaires)
        },
      },
    },
  },
  plugins: [],
};
export default config;

// lavender
// indigo
