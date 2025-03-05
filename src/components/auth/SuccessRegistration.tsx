import Link from "next/link";

const SuccessRegistration = () => {
  return (
    <div className="w-1/2 h-full flex flex-col justify-center items-center">
      <div className="h-min py-8 px-2 gap-2 flex flex-col items-center text-black bg-gray-100  rounded-lg m-2">
        <img src="/animated/animatedCheck.gif" alt="registration success" className="w-32 mx-auto" />
        <p className="text-lg font-semibold">
          Votre inscription a été effectuée avec succès.
        </p>
        <p className="text-black text-center">
          Vous pouvez maintenant profiter pleinement de notre plateforme.
        </p>
        <Link href="/dashboard"
          className="mx-6 w-min text-nowrap px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Acceder à mon compte
        </Link>
      </div>
    </div>
  );
}

export default SuccessRegistration;