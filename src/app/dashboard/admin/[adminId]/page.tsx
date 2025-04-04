'use client';

import { useParams } from 'next/navigation';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Building, 
  Clock, 
  CheckCircle,
  UserCheck,
  Briefcase,
  ListTodo,
  UserPlus
} from 'lucide-react';

// Composants réutilisables
import AdminStatsCard from './_components/AdminStatsCard';
import AdminFeatureCard from './_components/AdminFeatureCard';
import AdminDataTable from './_components/AdminDataTable';

const AdminDashboard = () => {
  const { adminId } = useParams();
  
  // Mock data pour l'interface
  const statsData = [
    {
      title: 'Total Utilisateurs',
      value: '1,483',
      icon: <Users className="h-6 w-6" />,
      trend: { value: 12.8, isPositive: true },
      bgColor: 'from-finance-primary to-finance-secondary',
    },
    {
      title: 'Factures',
      value: '8,642',
      icon: <FileText className="h-6 w-6" />,
      trend: { value: 8.2, isPositive: true },
      bgColor: 'from-finance-success to-emerald-500',
    },
    {
      title: 'Chiffre d\'affaires',
      value: '€187,429',
      icon: <CreditCard className="h-6 w-6" />,
      trend: { value: 4.3, isPositive: true },
      bgColor: 'from-finance-tertiary to-violet-500',
    },
    {
      title: 'Entreprises',
      value: '134',
      icon: <Building className="h-6 w-6" />,
      trend: { value: 6.7, isPositive: true },
      bgColor: 'from-amber-500 to-orange-500',
    },
  ];

  const featuresData = [
    {
      title: 'Gestion Utilisateurs',
      description: 'Gérer tous les utilisateurs de la plateforme',
      icon: <UserCheck className="h-6 w-6" />,
      href: `/dashboard/admin/${adminId}/users`,
    },
    {
      title: 'Validation Comptes',
      description: 'Valider les nouveaux comptes en attente',
      icon: <UserPlus className="h-6 w-6" />,
      href: `/dashboard/admin/${adminId}/validations`,
    },
    {
      title: 'Gestion Entreprises',
      description: 'Administrer les entreprises sur la plateforme',
      icon: <Briefcase className="h-6 w-6" />,
      href: `/dashboard/admin/${adminId}/enterprises`,
    },
    {
      title: 'Suivi Factures',
      description: 'Consulter et gérer toutes les factures',
      icon: <FileText className="h-6 w-6" />,
      href: `/dashboard/admin/${adminId}/invoices`,
    },
    {
      title: 'Gestion Tâches',
      description: 'Superviser les tâches et projets',
      icon: <ListTodo className="h-6 w-6" />,
      href: `/dashboard/admin/${adminId}/tasks`,
    },
    {
      title: 'Validation Paiements',
      description: 'Vérifier et valider les paiements',
      icon: <CheckCircle className="h-6 w-6" />,
      href: `/dashboard/admin/${adminId}/payments`,
    },
  ];

  // Colonnes de table pour les validations en attente
  const pendingColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'company', label: 'Entreprise' },
    { key: 'type', label: 'Type' },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'pending' ? 'bg-amber-100 text-amber-800' : 
          value === 'approved' ? 'bg-green-100 text-green-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {value === 'pending' ? 'En attente' : 
           value === 'approved' ? 'Approuvé' : 'Refusé'}
        </span>
      )
    },
    { key: 'requestDate', label: 'Date de demande' },
  ];

  // Données fictives de validations en attente
  const pendingData = [
    { 
      id: 1, 
      name: 'Thomas Dupont', 
      email: 'thomas@dupont.com', 
      company: 'Dupont Consulting', 
      type: 'Entreprise',
      status: 'pending', 
      requestDate: '2025-04-02' 
    },
    { 
      id: 2, 
      name: 'Marie Lefevre', 
      email: 'marie@design.fr', 
      company: 'Design Studio', 
      type: 'Entreprise',
      status: 'pending', 
      requestDate: '2025-04-01' 
    },
    { 
      id: 3, 
      name: 'Paul Martin', 
      email: 'paul@martin.fr', 
      company: 'Freelance', 
      type: 'Indépendant',
      status: 'pending', 
      requestDate: '2025-03-30' 
    },
    { 
      id: 4, 
      name: 'Sophie Bernard', 
      email: 'sophie@techpro.com', 
      company: 'TechPro Services', 
      type: 'Entreprise',
      status: 'pending', 
      requestDate: '2025-03-29' 
    },
    { 
      id: 5, 
      name: 'Lucas Petit', 
      email: 'lucas@petit.fr', 
      company: 'Freelance', 
      type: 'Indépendant',
      status: 'pending', 
      requestDate: '2025-03-28' 
    },
  ];

  // Colonnes de table pour les dernières factures
  const invoiceColumns = [
    { key: 'number', label: 'Numéro' },
    { key: 'client', label: 'Client' },
    { key: 'amount', label: 'Montant' },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'paid' ? 'bg-green-100 text-green-800' : 
          value === 'pending' ? 'bg-amber-100 text-amber-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {value === 'paid' ? 'Payée' : 
           value === 'pending' ? 'En attente' : 'En retard'}
        </span>
      )
    },
    { key: 'issueDate', label: 'Date d\'émission' },
    { key: 'dueDate', label: 'Échéance' },
  ];

  // Données fictives de factures
  const invoiceData = [
    { 
      id: 1, 
      number: 'INV-2025-0421', 
      client: 'Tech Solutions', 
      amount: '€2,450', 
      status: 'paid', 
      issueDate: '2025-03-15',
      dueDate: '2025-04-14'
    },
    { 
      id: 2, 
      number: 'INV-2025-0422', 
      client: 'Média Plus', 
      amount: '€1,850', 
      status: 'pending', 
      issueDate: '2025-03-18',
      dueDate: '2025-04-17'
    },
    { 
      id: 3, 
      number: 'INV-2025-0423', 
      client: 'Atelier Design', 
      amount: '€3,200', 
      status: 'overdue', 
      issueDate: '2025-02-25',
      dueDate: '2025-03-25'
    },
    { 
      id: 4, 
      number: 'INV-2025-0424', 
      client: 'Construct Pro', 
      amount: '€5,750', 
      status: 'paid', 
      issueDate: '2025-03-22',
      dueDate: '2025-04-21'
    },
    { 
      id: 5, 
      number: 'INV-2025-0425', 
      client: 'Global Services', 
      amount: '€1,100', 
      status: 'pending', 
      issueDate: '2025-03-28',
      dueDate: '2025-04-27'
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-finance-text-primary">Administration</h1>
        <p className="mt-2 text-finance-text-secondary">
          Gérez les utilisateurs, entreprises, factures et validez les nouveaux comptes
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Fonctionnalités d'administration */}
      <div>
        <h2 className="text-xl font-semibold text-finance-text-primary mb-4">
          Fonctions d'Administration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <AdminFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
            />
          ))}
        </div>
      </div>

      {/* Section de tableau des validations en attente */}
      <div>
        <h2 className="text-xl font-semibold text-finance-text-primary mb-4">
          Validations En Attente
        </h2>
        <AdminDataTable
          columns={pendingColumns}
          data={pendingData}
          title="Demandes de Comptes"
          onRowClick={(item) => console.log('Item clicked:', item)}
        />
      </div>

      {/* Section de tableau des dernières factures */}
      <div>
        <h2 className="text-xl font-semibold text-finance-text-primary mb-4">
          Dernières Factures
        </h2>
        <AdminDataTable
          columns={invoiceColumns}
          data={invoiceData}
          title="Aperçu des Factures"
          onRowClick={(invoice) => console.log('Invoice clicked:', invoice)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
