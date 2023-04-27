
import Rewards from './header/Rewards';
import Title from './header/Title';
import Setting from './header/Setting';

const Header = () => {

    return(
        <div className="z-10 absolute px-4 w-screen h-16 bg-transparent flex justify-between items-center">
            <Rewards />
            <Title />
            <Setting />
        </div>
    )
}

export default Header;