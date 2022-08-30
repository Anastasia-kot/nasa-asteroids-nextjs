import Header from './Header/Header';
import Footer from './Footer/Footer';
import { ReactNode, FC } from 'react';


type PropsType ={
    children: ReactNode
}
const Layout: FC<PropsType> =  ({children}) => (
    <div>
        <Header />
            {children}
        <Footer />
    </div>
)

export default Layout;