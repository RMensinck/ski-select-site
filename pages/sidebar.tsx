import { FaPaperPlane, FaRoute, FaHome, FaBars, FaMicroscope } from 'react-icons/fa'

const SideBar = () => {
    return (
        <div className="w-16 h-16 group z-10">
            <SideBarIcon icon={<FaBars size="28" />} text=" "/>
            <div className="fixed top-0 left-0 h-screen  w-16 m-0 flex flex-col 
                            bg-slate-100 text-white shadow-lg group:hover:z-20 bg-opacity-50
                            scale-0 group-hover:scale-100 transition-all duration-200" >
                <SideBarIcon icon={<FaHome size="28" />} text='Home'/>
                <SideBarIcon icon={<FaRoute size="28" />} text='Our mission, Coming soon!'/>
                <SideBarIcon icon={<FaMicroscope size="28"/>} text='reviews Coming soon!'/>
                <SideBarIcon icon={<FaPaperPlane size="28"/>} text='Contact, Coming soon!'/>
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