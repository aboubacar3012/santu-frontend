"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    router.push("/dashboard/partner")
  }
  return (
    <div className="min-h-screen text-black flex justify-center">
      <div
        className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
      >
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ "backgroundImage": "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="/santu-logo.png"
              className="w-32 mx-auto"
            />
          </div>
          <div className="mt-12 md:mt-36 flex flex-col items-center justify-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              CONNEXION
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Entrez votre email"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                />
                <button onClick={handleLogin}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  SE CONNECTER
                </button>
                <p className="mt-6 text-xs text-black text-center">
                  J&apos;accepte les{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Conditions d&apos;utilisation{" "}
                  </a>
                  et la {" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Politique de confidentialité
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;