import Button from '../../../components/shared/Button';
import { IoMdAdd, IoMdSave, IoMdTrash } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import CodeBlock from '../../../components/shared/CodeBlock';

const ButtonDemo = () => {
  return (
    <div className="p-8 space-y-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Démonstration des boutons</h2>

      {/* Variantes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Variantes</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primaire</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <CodeBlock
          code={`<Button variant="primary">Primaire</Button>
<Button variant="secondary">Secondaire</Button>
<Button variant="danger">Danger</Button>`}
        />
      </section>

      {/* Tailles */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Tailles</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Petit</Button>
          <Button size="md">Moyen</Button>
          <Button size="lg">Grand</Button>
        </div>
        <CodeBlock
          code={`<Button size="sm">Petit</Button>
<Button size="md">Moyen</Button>
<Button size="lg">Grand</Button>`}
        />
      </section>

      {/* Avec icônes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Avec icônes</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<IoMdAdd className="w-5 h-5" />}>Créer</Button>
          <Button icon={<FiChevronRight className="w-5 h-5" />} iconPosition="right">
            Continuer
          </Button>
          <Button variant="secondary" icon={<IoMdSave className="w-5 h-5" />}>
            Enregistrer
          </Button>
          <Button variant="danger" icon={<IoMdTrash className="w-5 h-5" />}>
            Supprimer
          </Button>
        </div>
        <CodeBlock
          code={`import { IoMdAdd, IoMdSave, IoMdTrash } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';

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
</Button>`}
        />
      </section>

      {/* États */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">États</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Désactivé</Button>
          <Button loading>Chargement</Button>
          <Button loading icon={<IoMdSave className="w-5 h-5" />}>
            Enregistrement
          </Button>
        </div>
        <CodeBlock
          code={`<Button disabled>Désactivé</Button>
<Button loading>Chargement</Button>
<Button loading icon={<IoMdSave className="w-5 h-5" />}>
  Enregistrement
</Button>`}
        />
      </section>

      {/* Largeur complète */}
      <section className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold text-gray-900">Largeur complète</h3>
        <div className="space-y-4">
          <Button fullWidth>Bouton pleine largeur</Button>
          <Button fullWidth variant="secondary" icon={<IoMdSave className="w-5 h-5" />}>
            Enregistrer les modifications
          </Button>
        </div>
        <CodeBlock
          code={`<Button fullWidth>Bouton pleine largeur</Button>
<Button
  fullWidth
  variant="secondary"
  icon={<IoMdSave className="w-5 h-5" />}
>
  Enregistrer les modifications
</Button>`}
        />
      </section>
    </div>
  );
};

export default ButtonDemo;
