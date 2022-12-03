import Style from './Footer.scss';
import { MDBFooter } from 'mdb-react-ui-kit';
function Footer() {
    return (
        <MDBFooter bgColor="light" className="text-center text-lg-left">
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
