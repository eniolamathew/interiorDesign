"use client"
import react, {useState, useEffect} from "react"
import Carousel from '../../../components/carousel/carousel'
import theme from '../../style/theme'
import styled from 'styled-components'
import ImageLoader from './ImageLoader';

// Type for individual image in the carousel
interface CarouselImage {
    src: string;
    description: string;
}
  
// Type for a carousel which includes name, description, and images
interface Carousel {
    name: string;
    description: string;
    images: CarouselImage[];
}

interface CarouselData {
    carousels: Carousel[];
}

interface ICategoryIntroProps {
    title: string,
    autoplay: boolean,
    carousel: Carousel[];
}

const IntroHeaderCarousel = styled.div`
    padding: 0rem 1rem;
    position: relative;
`;

const ImageHolder = styled.div`
    position: relative;
    min-height: 200px;
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 100%; 
`;

const Block = styled.div`
    vertical-align: top;
    width:100%;
    display:inline-block;

    @media screen and (max-width: ${theme.breakpoints.md}px) {
        width:100%;
    }
`

const Title = styled.div`
  font-size: 1rem;
  margin: 0rem 1rem;
  margin-bottom: 4px;
  color: white;
`;

function HomeCarousel(props: ICategoryIntroProps) {
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null); 

    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };
 
    useEffect(() => {
        // Add event listener to track mouse position
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mousePosition]);
    
    return <>
        <Block>
            {props.carousel?.length > 0 && props.carousel.map((carousel: Carousel, index: number) => <div key={index}> {
                carousel.name === props.title &&
                <div className={props.title.toLowerCase()}>
                        <Title >{carousel.description}</Title>
                        <IntroHeaderCarousel>
                            <Carousel
                                name={props.title.toLowerCase()}
                                autoplay={props.autoplay}
                                mousePosition={mousePosition}
                                interval={5000}  
                                hasDots={true}
                                slidesToShow={5}
                                slidesToScroll={5}
                            >                                    
                                {carousel.images?.length > 0 && carousel.images.map((item: CarouselImage, index: number) =>
                                <div key={index} >
                                    <ImageHolder>
                                        <ImageLoader
                                            src={item.src}
                                            alt={item.description}
                                            width={150}
                                            height={150}
                                            maxSize={5}
                                            layout="fill"
                                            breaks={[320, 568, 800, 1280]}
                                            description={item.description}
                                        />
                                    </ImageHolder>
                                </div>)}
                            </Carousel>
                        </IntroHeaderCarousel> 
                        </div>
            }</div> )}
        </Block>
    </>
}

export default HomeCarousel