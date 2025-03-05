"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { loginReducer, updateToken } from "../redux/features/authSlice"
import { changePassword, authenticate } from "../services/account"
import { RootState } from "../redux/store"
import RegistrationInfoForm from "../components/auth/RegistrationInfoForm"
import SuccessRegistration from "../components/auth/SuccessRegistration"

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState('');
  const [registrationStep, setRegistrationStep] = useState(1)


  const auth = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (auth.isAuthenticated && auth.loggedAccountInfos) {
  //     return router.push("/dashboard")
  //   }
  // },[])

  const handleLogin = () => {
    // setUserOnlyExists(true)
    // setShowPasswordInput(true)

    return authenticate(email, password).then((data) => {
      if (data.success) {
        console.log(data)
        if (data.account && data.created) {
          setShowPasswordInput(true)
        } else if (data.account && data.exist) {
          setShowPasswordInput(true)
        }
        else if (data.token) {
          dispatch(loginReducer({ isAuthenticated: true, loggedAccountInfos: data.account }))
          dispatch(updateToken(data.token))
          if (data.account.isFirstLogin) setRegistrationStep(2);
          else router.push("/dashboard")
        }
      } else {
        toast.error(data.message)
      }
    })
  }


  return (
    <div className="min-h-screen text-black flex justify-center">
      <div
        className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
      >
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ "backgroundImage": "url('/images/authimg.png')" }}
          ></div>
        </div>
        {registrationStep === 1 && (
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="/images/logo.png"
                className="w-32 mx-auto rounded-full"
              />
            </div>
            <div className={`mt-12 md:mt-36 flex flex-col items-center justify-center`}>
              <h1 className="text-xl font-extrabold">
                Authentification
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="email" className="block  text-sm font-medium text-black">
                      Entrez votre adresse email
                    </label>
                    {
                      showPasswordInput && (
                        <p className="mt-2 text-xs text-black text-right hover:underline cursor-pointer" onClick={() => setShowPasswordInput(false)}>
                          Modifier
                        </p>
                      )
                    }
                  </div>
                  <input
                    onClick={() => setShowPasswordInput(false)}
                    disabled={showPasswordInput}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg font-medium  border border-gray-200 placeholder-gray-500 text-sm"
                    type="email"
                    placeholder="Entrez votre email"
                  />

                  {
                    showPasswordInput && (
                      <div className="mt-3">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                          Entrez votre mot de passe
                        </label>
                        <input
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg font-medium  border border-gray-200 placeholder-gray-500 text-sm"
                          type="password"
                          placeholder="Entrez votre mot de passe"
                        />
                      </div>
                    )
                  }

                  <button onClick={handleLogin}
                    className="mt-5 font-semibold bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
                  >
                    {showPasswordInput ? "Se connecter" : "Continuer"}
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
        )}
        {registrationStep === 2 && (
          <RegistrationInfoForm setRegistrationStep={setRegistrationStep} />
        )}
        {registrationStep === 3 && (
          <SuccessRegistration />
        )}
      </div>
    </div>
  );
}

export default LoginPage;