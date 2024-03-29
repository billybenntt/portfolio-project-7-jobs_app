import Wrapper from '@/styles/wrappers/BigSidebar.tsx'
import {Logo, NavLinks} from '@/components/index.tsx'
import {useAppSelector} from '@/store/hooks.ts';


// SIDEBAR COMPONENT
/* Hidden on Small Screen Sizes*/
function SidebarBig() {

    const {isSidebarOpen} = useAppSelector(store => store.user)

    const isActive = isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'

    return (
        <Wrapper>
            <div className={isActive}>

                <div className="content">
                    <header>
                        <Logo/>
                    </header>
                    <NavLinks toggleSidebar={isSidebarOpen}/>
                </div>


            </div>
        </Wrapper>
    )
}

export default SidebarBig
