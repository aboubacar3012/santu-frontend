import React from 'react';
import Table, { Column } from '@/src/components/shared/Table';
import { Article } from '@/src/types';

type ArticleTableProps = {
  articles: Partial<Article>[];
  onDeleteArticle?: (index: number) => void;
};

const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  onDeleteArticle,
}) => {
  const columns: Column<Partial<Article>>[] = [
    {
      header: '#',
      accessor: (_: any, index: number | undefined) =>
        index !== undefined ? index + 1 : 0,
      className: 'w-12',
    },
    {
      header: 'Produit/Service',
      accessor: (article: {
        name:
          | string
          | number
          | bigint
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | Promise<React.AwaitedReactNode>
          | null
          | undefined;
        description:
          | string
          | number
          | bigint
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | Promise<React.AwaitedReactNode>
          | null
          | undefined;
      }) => (
        <div>
          <p className="font-medium text-gray-800">{article.name}</p>
          {article.description && (
            <p className="text-xs text-gray-500 mt-0.5">
              {article.description}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Montant (GNF)',
      accessor: (article: { price: { toLocaleString: () => any } }) =>
        `${article.price?.toLocaleString()} GNF`,
      className: 'text-right',
    },
    ...(onDeleteArticle
      ? [
          {
            header: 'Actions',
            accessor: (_: any, index: number | undefined) => (
              <button
                onClick={() => index !== undefined && onDeleteArticle(index)}
                className="text-red-500 hover:text-red-700 p-1 transition-colors"
                title="Supprimer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            ),
            className: 'w-16 text-center',
          },
        ]
      : []),
  ].filter(Boolean) as Column<Partial<Article>>[];

  const emptyMessage = 'Aucun produit ou service ajouté';

  return (
    <Table
      columns={columns}
      data={articles}
      headerClassName="text-xs uppercase bg-gradient-to-r from-gray-700 to-gray-600"
      emptyMessage={emptyMessage}
      className="w-full text-sm text-left text-gray-800"
    />
  );
};

export default ArticleTable;
