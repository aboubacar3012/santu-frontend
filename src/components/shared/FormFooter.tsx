interface FormFooterProps {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  errorMessage?: string;
}

const FormFooter = ({ onClose, onSubmit, isLoading, errorMessage }: FormFooterProps) => {
  return (
    <div className="w-full">
      {/* Message d'erreur global */}
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4 border border-red-100 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Annuler
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 border border-transparent rounded-md shadow-sm hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Chargement...
            </span>
          ) : (
            'Enregistrer'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
