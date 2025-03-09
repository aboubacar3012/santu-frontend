import Button from '../../shared/Button';
import { IoMdAdd, IoMdSave, IoMdTrash } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';

const ButtonDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Démonstration des boutons
      </h2>

      {/* Variantes */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Variantes</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primaire</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      {/* Tailles */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Tailles</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Petit</Button>
          <Button size="md">Moyen</Button>
          <Button size="lg">Grand</Button>
        </div>
      </section>

      {/* Avec icônes */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Avec icônes</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<IoMdAdd className="w-5 h-5" />}>Créer</Button>
          <Button
            icon={<FiChevronRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Continuer
          </Button>
          <Button variant="secondary" icon={<IoMdSave className="w-5 h-5" />}>
            Enregistrer
          </Button>
          <Button variant="danger" icon={<IoMdTrash className="w-5 h-5" />}>
            Supprimer
          </Button>
        </div>
      </section>

      {/* États */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">États</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Désactivé</Button>
          <Button loading>Chargement</Button>
          <Button loading icon={<IoMdSave className="w-5 h-5" />}>
            Enregistrement
          </Button>
        </div>
      </section>

      {/* Largeur complète */}
      <section className="space-y-2 max-w-md">
        <h3 className="text-lg font-semibold text-gray-700">
          Largeur complète
        </h3>
        <div className="space-y-4">
          <Button fullWidth>Bouton pleine largeur</Button>
          <Button
            fullWidth
            variant="secondary"
            icon={<IoMdSave className="w-5 h-5" />}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo;
