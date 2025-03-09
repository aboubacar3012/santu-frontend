'use client';

const UIOverviewPage = () => {
  return (
    <div className="py-10 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            SantuUI
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Une bibliothèque de composants modernes pour vos projets React et
            Next.js
          </p>
        </div>

        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Commencez rapidement
            </h2>
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <p className="text-base text-gray-600 mb-4">
                  Explorez les composants en utilisant la barre latérale pour
                  naviguer entre les différentes catégories et découvrir les
                  fonctionnalités disponibles.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <code className="text-sm">
                    import {'{'} Button {'}'} from &apos;santu-ui&apos;;
                    <br />
                    <br />
                    function App() {'{'}
                    <br />
                    &nbsp;&nbsp;return &lt;Button
                    variant=&quot;primary&quot;&gt;Commencer&lt;/Button&gt;;
                    <br />
                    {'}'}
                  </code>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Caractéristiques principales
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-white shadow overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Design moderne
                </h3>
                <p className="text-sm text-gray-600">
                  Des composants élégants et modernes avec des animations
                  fluides pour une expérience utilisateur de qualité.
                </p>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Entièrement personnalisable
                </h3>
                <p className="text-sm text-gray-600">
                  Adaptez facilement les composants à votre identité visuelle
                  avec des options de personnalisation avancées.
                </p>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Accessibilité
                </h3>
                <p className="text-sm text-gray-600">
                  Tous les composants sont conçus selon les normes
                  d'accessibilité pour être inclusifs et utilisables par tous.
                </p>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Compatible TypeScript
                </h3>
                <p className="text-sm text-gray-600">
                  Profitez du typage fort pour une meilleure expérience de
                  développement et moins d'erreurs.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UIOverviewPage;
