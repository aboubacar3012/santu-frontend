"use client"
import Link from "next/link";
import { MdDashboard, MdOutlinePhoneInTalk } from "react-icons/md";
import { MdCampaign } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaQuestionCircle, FaUserCog } from "react-icons/fa";
import { TbFileEuro } from "react-icons/tb";
import { LiaNewspaper } from "react-icons/lia";
import { MdManageAccounts } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/src/redux/store";
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const auth = useSelector((state: RootState) => state.auth);
  const partnerId = auth.loggedUserInfos?.partnerId?._id;

  const dispatch = useDispatch();
  const router = useRouter()
  const pathname = usePathname()

  const menuItems: any = [
    // {
    //   roles: ["admin"],
    //   name: "Campagnes",
    //   icon: <MdCampaign className="w-6 h-6" />,
    //   href: "/dashboard/admin/campaigns",
    //   isActive: pathname === "/dashboard/admin/campaigns"
    // },
    // {
    //   roles: ["admin"],
    //   name: "Partenaires",
    //   icon: <BsFillPeopleFill className="w-6 h-6" />,
    //   href: "/dashboard/admin/partners",
    //   isActive: pathname === "/dashboard/admin/partners"
    // },
    // {
    //   roles: ["admin"],
    //   name: "Comptes",
    //   icon: <MdManageAccounts className="w-6 h-6" />,
    //   href: "/dashboard/admin/accounts",
    //   isActive: pathname === "/dashboard/admin/accounts"
    // },
    {
      roles: ["partner"],
      name: "Tableau de bord",
      icon: <MdDashboard className="w-6 h-6" />,
      href: "/dashboard",
      isActive: pathname === "/dashboard"
    },
    {
      roles: ["partner"],
      name: "Clients",
      icon: <FaUsers className="w-6 h-6" />,
      href: `/dashboard/clients`,
      isActive: pathname.includes("/dashboard/clients")
    },
    // {
    //   roles: ["partner"],
    //   name: "Contact",
    //   icon: <MdOutlinePhoneInTalk className="w-6 h-6" />,
    //   href: "https://santu.fr/contact-santu/",
    //   isActive:false

    // },
    // {
    //   roles: ["partner"],
    //   name: "Aide et FAQ",
    //   icon: <FaQuestionCircle className="w-6 h-6" />,
    //   href: "/",
    //   isActive:false
    // },
    // {
    //   roles: ["partner"],
    //   name: "Factures et Contrats",
    //   icon: <TbFileEuro className="w-6 h-6" />,
    //   href: `/dashboard/profile/${partnerId}`,
    //   isActive: pathname.includes("/dashboard/profile")
    // },
    // {
    //   roles: ["partner"],
    //   name: "Actualités santu",
    //   icon: <LiaNewspaper className="w-6 h-6" />,
    //   href: "/",
    //   isActive:false
    // },

  ];



  const handleLogout = () => {
    dispatch(logout())
    return router.push("/")
  }
  return (

    <div className="flex flex-row w-full h-screen items-center gap-10">
      {/* Left Section */}
      <div className="relative flex flex-col w-1/6 h-[96vh] bg-white text-black rounded-2xl">
        <div className="flex flex-col items-center justify-center h-20 w-full ">
          <h3 className="text-2xl font-sans font-bold">Santu Pro</h3>
        </div>
        {/* divider */}
        <div className="h-0.5 w-full bg-gray-100"></div>

        <div className="flex flex-col items-start justify-center w-full gap-4">
          {menuItems.map((item: any) => {
            // if (item.roles.includes("partner")) {
            return (
              <Link key={item.name} href={item.href} className={`flex items-center justify-start w-full gap-2 p-2 hover:bg-gray-200 ${item.isActive && 'bg-gray-200'}`}>
                {item.icon}
                <span className="text-xl">{item.name}</span>
              </Link>
            );
            // }
          }
          )}
          <hr className="w-full border-gray-50" />
          <Link href="/account" className={`flex items-center justify-start w-full gap-2 p-2 hover:bg-gray-200 `}>
            <FaUserCog className="w-6 h-6" />
            <span className="text-xl">Mon compte</span>
          </Link>

          {/* Logout button bottom */}
          <div onClick={handleLogout} className="absolute bottom-8 flex flex-col items-center justify-center w-full">
            <button className="w-48 p-2 text-xl font-sans font-normal text-white bg-red-500 rounded-md">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      {/* Right Section */}
      {children}
    </div>
  )
}