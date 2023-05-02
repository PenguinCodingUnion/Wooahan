import Rewards from './header/Rewards';
import Title from './header/Title';
import Setting from './header/Setting';
import {Link} from 'react-router-dom'
import Home from '../main/books/Home'

const Header = (props) => {
    
    return(
        <div className="z-20 absolute px-[4%] mt-[1%] w-screen h-[15%] bg-transparent flex justify-between items-center">
            {(props.topLeftButton === "books") ? <Rewards><Link to="/books"></Link></Rewards> : <Home />}
            {props.titleIsVisible && <Title />}
            <Setting />
        </div>
    )
}

export default Header;