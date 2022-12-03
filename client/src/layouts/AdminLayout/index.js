import Style from './AdminLayout.module.scss';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);
function AdminLayout({ children }) {
    return (
        <div className={cx('container')}>
            <SideMenu />

            <div className={cx('content')}>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default AdminLayout;
