import axios from 'axios';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import './carousel.scss';
export default function App() {
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        const getBanner = async () => {
            const banners = await axios.get('http://localhost:8080/api/discounts', {
                params: {
                    getAll: 'true',
                },
            });
            setBanner(banners.data.discounts);
        };
        getBanner();
    }, []);

    return banner.length > 0 ? (
        <MDBCarousel showControls showIndicators className="h-100" fade>
            {banner.map((item, index) => {
                return (
                    <MDBCarouselItem
                        className="w-100 d-block"
                        itemId={index + 1}
                        src={item.image}
                        alt="..."
                    ></MDBCarouselItem>
                );
            })}
        </MDBCarousel>
    ) : (
        <div></div>
    );
}
