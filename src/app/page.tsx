"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { loginReducer, updateToken } from "../redux/features/authSlice"
import { loginAccount, changePassword } from "../services/user"
import { RootState } from "../redux/store"

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [userOnlyExists, setUserOnlyExists] = useState(false)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated && auth.loggedAccountInfos) {
      return router.push("/dashboard")
    }
  }
    , [])

  const handleLogin = () => {
    setUserOnlyExists(true)
    setShowPasswordInput(true)
    router.push("/dashboard")
    // return loginAccount(email, password).then((data) => {
    //   if (data.success) {
    //     if (data.user && data.user.isFirstLogin) {
    //       dispatch(loginReducer({ isAuthenticated: false, loggedAccountInfos: data.user }))
    //       toast.info("Veuillez changer votre mot de passe")
    //       setPassword("")
    //     } else {
    //       dispatch(loginReducer({ isAuthenticated: true, loggedAccountInfos: data.user }))
    //       dispatch(updateToken(data.token))
    //       toast.success("Connexion réussie")
    //       if (data.user.role === "PARTNER") return router.push("/dashboard/partner")
    //       else return router.push("/dashboard/admin/partners")
    //     }
    //   } else {
    //     toast.error(data.message)
    //   }
    // })
  }


  return (
    <div className="min-h-screen text-gray-900 flex justify-center">
      <div
        className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
      >
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ "backgroundImage": "url('/images/authimg.png')" }}
          ></div>
        </div>
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
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Entrez votre email"
                />
                {
                  showPasswordInput && (
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                    />
                  )
                }

                <button onClick={handleLogin}
                  className="mt-5 font-semibold bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
                >
                  Continuer
                </button>
                {/* <p className="mt-6 text-xs text-gray-600 text-center">
                  J&apos;accepte les{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Conditions d&apos;utilisation{" "}
                  </a>
                  et la {" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Politique de confidentialité
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;