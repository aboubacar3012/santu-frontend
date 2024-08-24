"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { loginReducer, updateToken } from "../redux/features/authSlice"
import { loginUser, changePassword } from "../services/user"
import { RootState } from "../redux/store"

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [editPassword, setEditPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")


  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // if(auth.isAuthenticated && auth.loggedUserInfos) {
      return router.push("/dashboard")
    // }
  }
  , [])

  const handleLogin = () => {
    if (editPassword){
      if(newPassword !== confirmNewPassword){
        toast.error("Les mots de passe ne correspondent pas")
        return
      }

      // mot de passe doit contenir au moins 8 caractères, 
      // une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if(!passwordRegex.test(newPassword)){
        toast.error("Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial")
        return
      }

      return changePassword(auth.loggedUserInfos?._id, newPassword).then((data) => {
        if(data.success){
          dispatch(loginReducer({isAuthenticated: true, loggedUserInfos: data.user}))
          dispatch(updateToken(data.token))
          toast.success("Mot de passe changé avec succès")
          toast.success("Veillez vous connecter avec votre nouveau mot de passe")
          setEditPassword(false)
        } else {
          toast.error(data.message)
        }
      })
    }

    const passwordToUse = editPassword ? newPassword : password;
    return loginUser(email, passwordToUse).then((data) => {
      if (data.success) {
        if(data.user && data.user.isFirstLogin){
          dispatch(loginReducer({isAuthenticated: false, loggedUserInfos: data.user}))
          toast.info("Veuillez changer votre mot de passe")
          setPassword("")
          setEditPassword(true)
        }else{
          dispatch(loginReducer({isAuthenticated: true, loggedUserInfos: data.user}))
          dispatch(updateToken(data.token))
          toast.success("Connexion réussie")
          if(data.user.role === "PARTNER") return router.push("/dashboard/partner")
          else return router.push("/dashboard/admin/partners")
        }
      } else {
        toast.error(data.message)
      }
    })
  }


  return (
    <div className="min-h-screen text-gray-900 flex justify-center">
      <div
        className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
      >
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ "backgroundImage": "url('/santuLoginImg.png')" }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="/logo.png"
              className="w-32 mx-auto"
            />
          </div>
          <div className={`${editPassword ? "mt-4 md:mt-20" : "mt-12 md:mt-36"}  flex flex-col items-center justify-center`}>
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              CONNEXION
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
                  !editPassword ? (
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                    />
                  ) : (
                    <div>
                      <div className="my-4 border-b text-center">
                        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                          Nouveau mot de passe
                        </div>
                      </div>
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Entrez le nouveau mot de passe"
                      />
                      <input
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Confirmer le nouveau mot de passe"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Le mot de passe doit contenir au moins:
                        <ul className="list-disc list-inside">
                          <li>8 caractères</li>
                          <li>Une lettre majuscule</li>
                          <li>Une lettre minuscule</li>
                          <li>Un chiffre</li>
                          <li>Un caractère spécial</li>
                        </ul>
                      </p>
                    </div>
                  )
                }
                <button onClick={handleLogin}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  {
                    editPassword ? "ENREGISTRER" : "SE CONNECTER"
                  }
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