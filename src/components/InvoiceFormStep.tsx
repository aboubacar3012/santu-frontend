type InvoiceInfoFormProps = {
  step: number;
};
const InvoiceFormStep = ({ step }: InvoiceInfoFormProps) => {
  const getActiveStyle = (stepVal: number) => {
    if (step >= stepVal) {
      return 'text-white bg-gray-900';
    } else {
      return 'text-black bg-gray-300';
    }
  };
  return (
    <div className="w-full px-10 py-2 mb-10">
      <div className="relative flex items-center justify-around w-full">
        <div
          className={`absolute  top-2/4 h-0.5 w-1/2 -translate-y-2/4 ${
            step > 1 ? 'bg-gray-900' : 'bg-gray-300'
          }`}
        />
        <div
          className={`relative z-10 grid w-10 h-10 font-bold ${getActiveStyle(
            1
          )} transition-all duration-300 rounded-full place-items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            ></path>
          </svg>
          <div className="absolute -bottom-[2rem] w-max text-center ml-4">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-black">
              Informations
            </h6>
          </div>
        </div>

        <div
          className={`relative z-10 grid w-10 h-10 font-bold ${getActiveStyle(
            2
          )} transition-all duration-300 rounded-full place-items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
            ></path>
          </svg>
          <div className="absolute -bottom-[2rem] w-max text-center mr-4">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-black">
              Confirmation
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormStep;
