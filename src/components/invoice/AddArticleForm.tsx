import { Article } from "@/src/types";

type AddArticleFormProps = {
  articles: Partial<Article>[];
  setArticles: (articles: Partial<Article>[]) => void;
  articleName: string;
  setProductName: (articleName: string) => void;
  articleQuantity: string;
  setProductQuantity: (articleQuantity: string) => void;
  articlePrice: string;
  setProductPrice: (articlePrice: string) => void;
  articleDescription: string;
  setProductDescription: (articleDescription: string) => void;
}
const AddArticleForm = ({
  articles,
  setArticles,
  articleName,
  setProductName,
  articleQuantity,
  setProductQuantity,
  articlePrice,
  setProductPrice,
  articleDescription,
  setProductDescription
}: AddArticleFormProps) => {

  const addArticle = () => {
    if (!articleName || !articleQuantity || !articlePrice) alert("Veuillez remplir tous les champs");

    if (articleName && articleQuantity && articlePrice) {
      const article: Partial<Article> = {
        name: articleName,
        quantity: parseInt(articleQuantity),
        unitPrice: parseInt(articlePrice),
        description: articleDescription
      }
      setArticles([...articles, article]);
      setProductName("");
      setProductQuantity("");
      setProductPrice("");
      setProductDescription("");
    }
  }

  return (
    <>
      <div className="overflow-auto flex flex-col gap-2 bg-white py-4 px-2 h-48">
        {articles && articles.length > 0 && (
          <div className="shadow-md  mt-2 bg-white ">
            <table className="w-full text-sm text-left text-gray-500 sticky">
              <thead className="text-xs text-white text-gray-900 uppercase bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product/Service
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantité
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  articles.map((article, index) => (
                    <tr onClick={() => { }} key={index} className="text-xs border-b cursor-pointer hover:bg-gray-200">
                      <td className="px-6 py-2 text-gray-900">{index + 1}</td>
                      <td className="px-6 py-2 font-medium text-gray-900 whitespace-wrap">
                        {article.name}
                        <p className="text-xs text-gray-400">{article.description}</p>
                      </td>
                      <td className="px-6 py-2 text-gray-900">
                        {article.quantity}
                      </td>
                      <td className="px-6 py-2 text-gray-900">
                        {article.unitPrice} GNF
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
        {
          articles && articles.length === 0 && (
            <p className="text-gray-800 text-center mt-16">
              Veillez ajouter un produit ou service
            </p>
          )
        }
      </div>
      <hr className="w-full border-gray-50 py-2" />
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="article" className="block mb-2 text-sm font-medium text-gray-900">
            Nom du produit/service
          </label>
          <input value={articleName} onChange={(e) => setProductName(e.target.value)} type="text" id="article" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea value={articleDescription} onChange={(e) => setProductDescription(e.target.value)} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez la description de la campagne" required />
        </div>
      </div>
      <div className="flex gap-2 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">
            Quantité
          </label>
          <input value={articleQuantity} onChange={(e) => setProductQuantity(e.target.value)} type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
        </div>
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
            Prix
          </label>
          <input value={articlePrice} onChange={(e) => setProductPrice(e.target.value)} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
        </div>
      </div>
      <button
        type="button"
        disabled={!articleName || !articleQuantity || !articlePrice}
        onClick={addArticle}
        className="mx-4 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Ajouter
      </button>
    </>
  );
}

export default AddArticleForm;