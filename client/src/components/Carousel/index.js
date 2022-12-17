import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import banner1 from '../../assets/img/banner1.webp';
import banner2 from '../../assets/img/banner2.webp';
import banner3 from '../../assets/img/banner3.webp';
import './carousel.scss';
export default function App() {
    return (
        <MDBCarousel showControls showIndicators className="h-100">
            <MDBCarouselItem
                className="w-100 h-100 d-block item-carousel"
                itemId={1}
                src={banner1}
                alt="..."
            ></MDBCarouselItem>
            <MDBCarouselItem
                className="w-100 h-100 d-block item-carousel"
                itemId={2}
                src={banner2}
                alt="..."
            ></MDBCarouselItem>
            <MDBCarouselItem
                className="w-100 h-100 d-block item-carousel"
                itemId={3}
                src={banner3}
                alt="..."
            ></MDBCarouselItem>
        </MDBCarousel>
    );
}
