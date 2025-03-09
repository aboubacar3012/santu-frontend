import { Article } from '@/src/types';
import { toast } from 'react-toastify';
import FormInput from '@/src/components/ui/FormInput';
import { useState } from 'react';
import ArticleTable from './ArticleTable';

type ArticleAddFormProps = {
  articles: Partial<Article>[];
  setArticles: (articles: Partial<Article>[]) => void;
  articleName: string;
  setArticleName: (name: string) => void;
  articleQuantity: string;
  setArticleQuantity: (quantity: string) => void;
  articlePrice: string;
  setArticlePrice: (price: string) => void;
  articleDescription: string;
  setArticleDescription: (description: string) => void;
};

const ArticleAddForm = ({
  articles,
  setArticles,
  articleName,
  setArticleName,
  articleQuantity,
  setArticleQuantity,
  articlePrice,
  setArticlePrice,
  articleDescription,
  setArticleDescription,
}: ArticleAddFormProps) => {
  const [errors, setErrors] = useState({
    name: '',
    price: '',
  });

  const addArticle = () => {
    // Reset previous errors
    setErrors({ name: '', price: '' });

    // Validate inputs
    let isValid = true;
    if (!articleName) {
      setErrors(prev => ({
        ...prev,
        name: 'Le nom du produit/service est requis',
      }));
      isValid = false;
    }

    if (!articlePrice) {
      setErrors(prev => ({ ...prev, price: 'Le prix est requis' }));
      isValid = false;
    } else if (isNaN(Number(articlePrice)) || Number(articlePrice) <= 0) {
      setErrors(prev => ({ ...prev, price: 'Veuillez entrer un prix valide' }));
      isValid = false;
    }

    if (!isValid) return;

    const article: Partial<Article> = {
      name: articleName,
      price: parseInt(articlePrice),
      description: articleDescription,
    };

    setArticles([...articles, article]);
    toast.success('Produit ajouté avec succès', {
      position: 'top-center',
    });

    // Reset form fields
    setArticleName('');
    setArticleQuantity('');
    setArticlePrice('');
    setArticleDescription('');
  };

  const handleDeleteArticle = (index: number) => {
    const updatedArticles = [...articles];
    updatedArticles.splice(index, 1);
    setArticles(updatedArticles);
    toast.info('Produit supprimé');
  };

  return (
    <section className="space-y-4">
      {/* Liste des produits/services */}
      <div className="rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium p-4 border-b">
          Produits/Services ajoutés
        </h3>
        <div className="p-4 h-32 overflow-auto">
          <ArticleTable
            articles={articles}
            onDeleteArticle={handleDeleteArticle}
          />
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <div className="rounded-lg p-4 shadow-sm border">
        <h3 className="text-sm font-medium mb-3">
          Ajouter un produit ou service
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FormInput
                label="Nom du produit/service"
                value={articleName}
                onChange={e => setArticleName(e.target.value)}
                placeholder="Entrez le nom du produit ou service"
                required
                error={errors.name}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                  </svg>
                }
              />
            </div>
            <div>
              <FormInput
                label="Montant total (GNF)"
                value={articlePrice}
                onChange={e => setArticlePrice(e.target.value)}
                type="number"
                placeholder="Montant total"
                required
                error={errors.price}
                min={0}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                  </svg>
                }
              />
            </div>
          </div>

          <FormInput
            label="Description (optionnel)"
            value={articleDescription}
            onChange={e => setArticleDescription(e.target.value)}
            type="textarea"
            placeholder="Entrez une description du produit ou service"
            rows={2}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
            }
          />

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={addArticle}
              className="px-6 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleAddForm;
