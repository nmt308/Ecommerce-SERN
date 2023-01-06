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

    const data =
        banner.length > 0 &&
        banner.map((item, index) => {
            return (
                <MDBCarouselItem
                    className="w-100 h-100 d-block item-carousel"
                    itemId={index + 1}
                    src={item.image}
                    alt="..."
                ></MDBCarouselItem>
            );
        });
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
    // return (
    //     <MDBCarousel showControls showIndicators className="h-100" fade>
    //         <MDBCarouselItem
    //             className="w-100 d-block"
    //             itemId={1}
    //             src="https://firebasestorage.googleapis.com/v0/b/ecommerce-mern-stack-4be2a.appspot.com/o/banner-img%2Fbanner3.a5634035c312e31e7950.png?alt=media&token=547ff2ed-f43f-4fbc-b078-5d792a203bab"
    //             alt="..."
    //         >
    //             <div>OK KK K K K KSDSDSSS KKKKKKKK </div>
    //         </MDBCarouselItem>
    //     </MDBCarousel>
    // );
}
