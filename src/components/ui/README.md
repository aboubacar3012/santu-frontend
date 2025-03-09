# Composants UI pour SantouPro

## Modal

Un composant modal réutilisable avec diverses options de personnalisation.

### Propriétés

| Propriété           | Type                                     | Défaut   | Description                              |
| ------------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| isOpen              | boolean                                  | -        | Contrôle la visibilité du modal          |
| onClose             | () => void                               | -        | Fonction appelée à la fermeture du modal |
| title               | string (optionnel)                       | -        | Titre affiché en haut du modal           |
| size                | 'small' \| 'medium' \| 'large' \| 'full' | 'medium' | Définit la taille du modal               |
| children            | React.ReactNode                          | -        | Contenu du modal                         |
| showClose           | boolean                                  | true     | Affiche ou non le bouton de fermeture    |
| closeOnClickOutside | boolean                                  | true     | Ferme le modal en cliquant à l'extérieur |
| closeOnEsc          | boolean                                  | true     | Ferme le modal avec la touche Echap      |
| footer              | React.ReactNode (optionnel)              | -        | Contenu du pied de page du modal         |

### Exemple d'utilisation

```tsx
import Modal from '@/src/components/ui/Modal';
import { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal}>Ouvrir le modal</button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Titre du modal"
        size="medium"
        footer={
          <div className="flex justify-end">
            <button onClick={closeModal}>Annuler</button>
            <button
              onClick={() => {
                // Logique de validation
                closeModal();
              }}
            >
              Confirmer
            </button>
          </div>
        }
      >
        <p>Contenu du modal...</p>
      </Modal>
    </>
  );
};
```
