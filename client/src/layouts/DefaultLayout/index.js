import classNames from 'classnames/bind';
import Style from './DefaultLayout.module.scss';
import Header from './Header';
import Footer from './Footer';

const cx = classNames.bind(Style);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
