import { Assets } from '../../Assets/Assets';

function NavBar() {
    return (
        <nav className='row justify-content-between mx-0 py-3'>
            <div className="">
                <img src={Assets.Logo} alt="logoImage" />
            </div>
            <div className="">
                <img src={Assets.Hamburger} alt="hamburgerIcon" />
            </div>
        </nav>
    )
}

export default NavBar;
