'use client';
import React from 'react';
import Table, { Column } from '@/src/components/shared/Table';
import Badge from '@/src/components/Badge';

// Example data types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
};

const TablesPage = () => {
  // Sample data
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Inactive',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'Active',
    },
  ];

  const products: Product[] = [
    {
      id: 'P001',
      name: 'Laptop',
      price: 1200,
      category: 'Electronics',
      stock: 15,
    },
    {
      id: 'P002',
      name: 'Phone',
      price: 800,
      category: 'Electronics',
      stock: 25,
    },
    { id: 'P003', name: 'Chair', price: 150, category: 'Furniture', stock: 10 },
    { id: 'P004', name: 'Table', price: 300, category: 'Furniture', stock: 5 },
  ];

  // Define columns for users table
  const userColumns: Column<User>[] = [
    { header: 'Nom', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rôle', accessor: 'role' },
    {
      header: 'Status',
      accessor: user => {
        if (user.status === 'Active') return <Badge type="green" text="Actif" />;
        return <Badge type="gray" text="Inactif" />;
      },
    },
  ];

  // Define columns for products table
  const productColumns: Column<Product>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Produit', accessor: 'name' },
    { header: 'Prix', accessor: product => `${product.price} €` },
    { header: 'Catégorie', accessor: 'category' },
    {
      header: 'Stock',
      accessor: product => {
        if (product.stock > 10) return <Badge type="green" text={product.stock.toString()} />;
        if (product.stock > 0) return <Badge type="yellow" text={product.stock.toString()} />;
        return <Badge type="red" text="En rupture" />;
      },
    },
  ];

  const handleUserClick = (user: User) => {
    console.log('User clicked:', user);
    // Naviguer vers la page détaillée de l'utilisateur
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
    // Naviguer vers la page détaillée du produit
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Exemples de tables</h1>

      <h2 className="text-xl font-semibold mt-8 mb-4">Table des utilisateurs</h2>
      <Table columns={userColumns} data={users} onRowClick={handleUserClick} />

      <h2 className="text-xl font-semibold mt-8 mb-4">Table des produits</h2>
      <Table
        columns={productColumns}
        data={products}
        onRowClick={handleProductClick}
        headerClassName="text-xs uppercase bg-blue-700"
      />
    </div>
  );
};

export default TablesPage;
