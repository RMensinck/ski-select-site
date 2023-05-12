import { FaPaperPlane, FaRoute, FaHome, FaBars, FaMicroscope, FaUser } from 'react-icons/fa'
import texts from '../components/textsSidebar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import Image from 'next/image'

const SideBar = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    const [user, loading] = useAuthState(auth)
    
    const router = useRouter()
    const { locale } = router

    const signIn = async () => {
        const result = await signInWithRedirect(auth, provider)
    }

    return (
        <div className="w-16 h-16 group z-10">
            <SideBarIcon icon={<FaBars size="28" />} text=" "/>
            <div className="fixed top-0 left-0 h-screen  w-16 m-0 flex flex-col bg-white text-white shadow-lg group:hover:z-20 lg:bg-opacity-50
                            scale-0 group-hover:scale-100 transition-all duration-200" >
                <Link href="/"><SideBarIcon icon={<FaHome size="28"/>} text={texts.home[locale]}/></Link>
                <Link href="/mission"><SideBarIcon icon={<FaRoute size="28"/>} text={texts.mission[locale]}/></Link>
                <Link href="/contact"><SideBarIcon icon={<FaPaperPlane size="28"/>} text={texts.contact[locale]}/></Link>
                <Link href="/reviews"><SideBarIcon icon={<FaMicroscope size="28"/>} text={texts.reviews[locale]}/></Link> 
                {user === null &&  
                    <button onClick={() => signIn()}><SideBarIcon icon={<FaUser size="28"/>} text={texts.login[locale]} /></button>}
                {user && user.photoURL && 
                    <>
                        <button onClick={() => signOut(auth)}><SideBarIcon icon={ <FaUser size="28"/> } text={texts.logout[locale]} /></button>
                        <Link href="/profile"><SideBarIcon icon={ <img src={user.photoURL} alt="user profile picture" className="sidebar-icon" />  } text={texts.profile[locale]}/></Link>
                    </>
                    }

            </div>
        </div>
    )
}

const SideBarIcon = ({ icon, text = "Coming soon!" }) => (
    <div className="sidebar-icon">
        {icon}
        { text != " " &&
        <span className="sidebar-tooltip">
            {text}
        </span>}
    </div>
)

export default SideBar