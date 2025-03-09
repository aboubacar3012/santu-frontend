'use client';
import React from 'react';
import Button from '@/src/components/shared/Button';

// Demo composant Card simple
const Card = ({
  title,
  children,
  footer,
  className = '',
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

const CardPage = () => {
  return (
    <div className="py-10 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cartes</h1>
          <p className="mt-2 text-gray-600">
            Les cartes contiennent du contenu et des actions sur un seul sujet.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Carte Simple
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card>
                <p className="text-gray-700">
                  Une carte basique sans titre ni pied de page.
                </p>
              </Card>

              <Card title="Titre de la carte">
                <p className="text-gray-700">
                  Une carte avec un titre mais sans pied de page.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Carte avec pied de page
            </h2>
            <Card
              title="Paramètres du compte"
              footer={
                <div className="flex justify-end">
                  <Button variant="secondary" className="mr-2">
                    Annuler
                  </Button>
                  <Button>Enregistrer</Button>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Carte avec image
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Mobilier de bureau"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Design d'intérieur
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Solutions modernes pour votre espace de travail.
                  </p>
                  <Button size="sm">En savoir plus</Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Design d'intérieur
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Solutions modernes pour votre espace de travail avec une
                    approche minimaliste et fonctionnelle.
                  </p>
                  <Button size="sm">En savoir plus</Button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Espace de travail"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
