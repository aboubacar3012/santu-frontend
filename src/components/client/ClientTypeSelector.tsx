import { TypeEnum } from '@/src/types';

interface ClientTypeSelectorProps {
  clientType: TypeEnum;
  onChangeType: (type: TypeEnum) => void;
}

const ClientTypeSelector = ({
  clientType,
  onChangeType,
}: ClientTypeSelectorProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Type de client</h3>
      <div className="flex gap-4">
        <label
          className={`flex-1 relative cursor-pointer rounded-md border p-4 flex gap-2 items-center ${
            clientType === TypeEnum.PARTICULAR
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <input
            type="radio"
            name="clientType"
            value={TypeEnum.PARTICULAR}
            checked={clientType === TypeEnum.PARTICULAR}
            onChange={() => onChangeType(TypeEnum.PARTICULAR)}
            className="sr-only"
          />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
              clientType === TypeEnum.PARTICULAR
                ? 'border-green-500'
                : 'border-gray-300'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                clientType === TypeEnum.PARTICULAR
                  ? 'bg-green-500'
                  : 'bg-transparent'
              }`}
            ></span>
          </span>
          <span className="text-sm">Particulier</span>
        </label>

        <label
          className={`flex-1 relative cursor-pointer rounded-md border p-4 flex gap-2 items-center ${
            clientType === TypeEnum.PROFESSIONAL
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <input
            type="radio"
            name="clientType"
            value={TypeEnum.PROFESSIONAL}
            checked={clientType === TypeEnum.PROFESSIONAL}
            onChange={() => onChangeType(TypeEnum.PROFESSIONAL)}
            className="sr-only"
          />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
              clientType === TypeEnum.PROFESSIONAL
                ? 'border-green-500'
                : 'border-gray-300'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                clientType === TypeEnum.PROFESSIONAL
                  ? 'bg-green-500'
                  : 'bg-transparent'
              }`}
            ></span>
          </span>
          <span className="text-sm">Entreprise</span>
        </label>
      </div>
    </div>
  );
};

export default ClientTypeSelector;
