import Style from './Footer.module.scss';
import { MDBFooter } from 'mdb-react-ui-kit';
import classNames from 'classnames/bind';
const cx = classNames.bind(Style);
function Footer() {
    return (
        <MDBFooter bgColor="light" className={cx('text-center text-lg-left', 'footer')}>
            <div className="text-center p-3" style={{ backgroundColor: '#fff' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className="text-dark" href="https://mdbootstrap.com/">
                    Nguyen Minh Thanh
                </a>
            </div>
        </MDBFooter>
    );
}

export default Footer;
