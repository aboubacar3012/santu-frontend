import { loginReducer, updateToken } from '@/src/redux/features/authSlice';
import { RootState } from '@/src/redux/store';
import { updateAccount } from '@/src/services/account';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type RegistrationInfoFormProps = {
  setRegistrationStep: Dispatch<SetStateAction<number>>;
};

const RegistrationInfoForm = ({ setRegistrationStep }: RegistrationInfoFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.loggedAccountInfos?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && auth.loggedAccountInfos) {
      setEmail(auth.loggedAccountInfos.email);
    }
  }, []);

  const handleUpdateAccount = () => {
    // return updateAccount(
    //   userId,
    //   { firstName, lastName, company, phone, address },
    //   auth.token!
    // ).then(data => {
    //   if (data.success) {
    //     dispatch(
    //       loginReducer({
    //         isAuthenticated: true,
    //         loggedAccountInfos: data.account,
    //       })
    //     );
    //     dispatch(updateToken(data.token));
    //     setRegistrationStep(3);
    //     toast.success('Votre compte a été mis à jour avec succès');
    //   } else {
    //     toast.error(data.message);
    //   }
    // });
  };

  return (
    <div className="w-1/2 h-min py-2 gap-2 flex flex-col text-black bg-white  rounded-lg ">
      <div className="flex flex-col gap-1 px-6 mb-6">
        <h1 className="text-2xl font-semibold text-black p-0">Bienvenue sur Santou Pro</h1>
        <p className="text-black text-sm  p-0">
          Votre logiciel de facturation pour vous faciliter la vie
        </p>
        <div className="h-0.5 w-full bg-gray-100 mb-2"></div>
        <div>
          <h2 className="text-lg font-semibold">Nous sommes ravis de vous compter parmi nous !</h2>
          <p className="text-black">
            Pour profiter pleinement de toutes les fonctionnalités de notre plateforme, veuillez
            finaliser votre inscription.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className=" w-full min-w-[200px]">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-black">
            Prénom
          </label>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type="text"
            id="firstName"
            className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez votre prénom"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className=" w-full min-w-[200px]">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-black">
            Nom
          </label>
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type="text"
            id="lastName"
            className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez votre nom de famille"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className=" w-full min-w-[200px]">
          <label htmlFor="company" className="block mb-2 text-sm font-medium text-black">
            Nom de l&apos;entreprise
          </label>
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            type="text"
            id="company"
            className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez le nom de votre entreprise"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className=" w-full min-w-[200px]">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
            Adresse mail
          </label>
          <input
            value={email}
            disabled={true}
            type="text"
            id="email"
            className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className=" w-full min-w-[200px]">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">
            Téléphone
          </label>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            type="text"
            id="phone"
            className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez votre téléphone"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className=" w-full min-w-[200px]">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-black">
            Adresse
          </label>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            type="text"
            id="address"
            className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez votre téléphone"
            required
          />
        </div>
      </div>
      <button
        onClick={handleUpdateAccount}
        className="mx-6 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Continuer
      </button>
    </div>
  );
};

export default RegistrationInfoForm;
