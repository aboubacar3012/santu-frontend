type InvoiceInfoFormProps = {
  step: number;
};
const InvoiceFormStep = ({step}:InvoiceInfoFormProps) => {
  const getActiveStyle = (stepVal:number) => {
    if(step >= stepVal) {
      return "text-white bg-gray-900";
    }else{
      return "text-black bg-gray-300"; 
    }
  }
  return (
    <div className="w-full px-10 py-2 mb-10">
      <div className="relative flex items-center justify-between w-full">
        <div className={`absolute left-0 top-2/4 h-0.5 w-1/2 -translate-y-2/4 ${step >= 2 ? "bg-gray-900" : "bg-gray-300"}`} />
        <div className={`absolute right-0 top-2/4 h-0.5 w-1/2 -translate-y-2/4 ${step >= 3 ? "bg-gray-900" : "bg-gray-300"}  transition-all duration-500`}></div>
        
        <div className={`relative z-10 grid w-10 h-10 font-bold ${getActiveStyle(1)} transition-all duration-300 rounded-full place-items-center`}>
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
        
        <div className={`relative z-10 grid w-10 h-10 font-bold ${getActiveStyle(2)} transition-all duration-300 rounded-full place-items-center`}>
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
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            ></path>
          </svg>
          <div className="absolute -bottom-[2rem] w-max text-center">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-black">
              Produits/Services
            </h6>
          </div>
        </div>
        
        <div className={`relative z-10 grid w-10 h-10 font-bold ${getActiveStyle(3)} transition-all duration-300 rounded-full place-items-center`}>
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
}

export default InvoiceFormStep;