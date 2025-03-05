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
    if (!articleName || !articlePrice) alert("Veuillez remplir tous les champs");

    if (articleName && articlePrice) {
      const article: Partial<Article> = {
        name: articleName,
        price: parseInt(articlePrice),
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
      <div className="overflow-auto flex flex-col gap-2 bg-white py-4 px-2 h-32">
        {articles && articles.length > 0 && (
          <div className="shadow-md  mt-2 bg-white ">
            <table className="w-full text-sm text-left text-black sticky">
              <thead className="text-xs text-white uppercase bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product/Service
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Quantité
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Montant toal (GNF)
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  articles.map((article, index) => (
                    <tr onClick={() => { }} key={index} className="text-xs border-b cursor-pointer hover:bg-gray-200">
                      <td className="px-6 py-2 text-black">{index + 1}</td>
                      <td className="px-6 py-2 font-medium text-black whitespace-wrap">
                        {article.name}
                        <p className="text-xs text-gray-400">{article.description}</p>
                      </td>
                      {/* <td className="px-6 py-2 text-black">
                        {article.quantity}
                      </td> */}
                      <td className="px-6 py-2 text-black">
                        {article.price} GNF
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
            <p className="text-black font-semibold text-center mt-12">
              Veillez ajouter un produit ou service
            </p>
          )
        }
      </div>
      <hr className="w-full border-gray-50 py-2" />
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="article" className="block mb-2 text-sm font-medium text-black">
            Nom du produit/service
          </label>
          <input value={articleName} onChange={(e) => setProductName(e.target.value)} type="text" id="article" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">Description (optionnel)</label>
          <textarea value={articleDescription} onChange={(e) => setProductDescription(e.target.value)} id="description" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez une description du produit ou service" required />
        </div>
      </div>
      <div className="flex gap-2 px-4 py-2">
        {/* <div className="relative w-full min-w-[200px]">
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black">
            Quantité
          </label>
          <input value={articleQuantity} onChange={(e) => setProductQuantity(e.target.value)} type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
        </div> */}
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">
            Montant total (GNF)
          </label>
          <input value={articlePrice} onChange={(e) => setProductPrice(e.target.value)} type="number" id="price" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le montant total du produit ou service" required />
        </div>
      </div>
      <button
        type="button"
        disabled={!articleName && !articlePrice}
        onClick={addArticle}
        className="mx-4 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Ajouter
      </button>
    </>
  );
}

export default AddArticleForm;