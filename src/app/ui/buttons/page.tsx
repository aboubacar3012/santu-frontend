'use client';
import ButtonDemo from '@/src/app/ui/buttons/ButtonDemo';
import ApiTable, { ApiProperty } from '@/src/components/shared/ApiTable';

const ButtonPage = () => {
  const buttonProperties: ApiProperty[] = [
    {
      name: 'variant',
      type: 'primary | secondary | danger',
      defaultValue: 'primary',
      description: 'Définit le style du bouton',
    },
    {
      name: 'size',
      type: 'sm | md | lg',
      defaultValue: 'md',
      description: 'Définit la taille du bouton',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le bouton',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un indicateur de chargement',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      defaultValue: '-',
      description: 'Icône à afficher avec le texte',
    },
    {
      name: 'iconPosition',
      type: 'left | right',
      defaultValue: 'left',
      description: "Position de l'icône par rapport au texte",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Étend le bouton à la largeur de son conteneur',
    },
  ];

  return (
    <div className="py-10 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Boutons</h1>
          <p className="mt-2 text-gray-600">
            Les boutons permettent aux utilisateurs d'effectuer des actions et
            de faire des choix d'un simple clic.
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ButtonDemo />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">API</h2>
          <ApiTable properties={buttonProperties} />
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;
