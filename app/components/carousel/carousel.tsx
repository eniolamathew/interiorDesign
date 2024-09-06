"use client"
import React, { HTMLAttributes, useState, useEffect } from 'react';
import Icon, { IconType } from '../ui/icons/icon';
import Glider from 'react-glider';
import styled from 'styled-components';
import SliderModal from '../../components/ui/modal/SildeModal';
import carouselJson from '../home/subComponents/carousel.json';
import { debounce } from '../../../shared/hook/debounce';


export interface ICarouselProps extends HTMLAttributes<HTMLElement> {
    name: string;
    autoplay: boolean;
    interval: number;
    mousePosition:{ x: number, y: number } | null;
    hasDots?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
}

interface ICarouselHolder extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean;
}

const CarouselHolder = styled.div<ICarouselHolder>`
    position: relative;
    width: 100%;

    ${props => !props.visible && "visibility: hidden;"}

    /* Hide arrows by default */
    .glider-next, .glider-prev {
        position: absolute;
        top: 50%;
        transform: translateY(-50%); /* Center vertically */
        width: 32px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.7); 
        opacity: 0; /* Initially hidden */
        transition: opacity 0.3s ease; /* Smooth transition for showing/hiding */
    }

    /* Show the prev button when hovering over the first visible item */
    .glider-slide:first-child:hover ~ .glider-prev {
        opacity: 1;
    }

    /* Show the next button when hovering over the last visible item */
    .glider-slide:last-child:hover ~ .glider-next {
        opacity: 1;
    }

    /* Show the buttons when hovering over the buttons themselves */
    .glider-next:hover,
    .glider-prev:hover {
        opacity: 1;
    }

    /* Optionally, show the buttons when hovering over the entire carousel */
    .glider:hover .glider-next,
    .glider:hover .glider-prev {
        opacity: 1;
    }

    & .glider-prev {
        left: 0px;
    }

    & .glider-next {
        right: 0px; 
    }

    & .glider-next.disabled, & .glider-prev.disabled {
        visibility: hidden;
    }

    & .glider-track {
        display: flex;
    }
    
    /* Dots (pagination) styles */
    & .glider-dots {
        display: flex;
        justify-content: flex-end;
        padding: 1rem 2rem 1rem 2rem;
        position: relative;
    }

    & .glider-dot {
        width: 20px; 
        height: 4px; 
        background-color: gray;
        border-radius: 2px;
        margin: 0 5px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    & .glider-dot.active {
        background-color: white; /* Active dot color */
        transform: scale(1.2); /* Optional: make active dot slightly larger */
    }

    /* General styling for each slide */
    .glider-slide {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 .2vw;
        box-sizing: border-box;
        white-space: normal;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease;
        width: 100%;
        height: 100%;
    }

    .glider-slide img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 0.5rem;
    }
`;

const Carousel = (props: ICarouselProps) => {
    const [glider, setGlider] = useState<any>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [hoveredSlide, setHoveredSlide] = useState<null | number>(null);  
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [imageData, setImageData] = useState<CarouselImage | null>(null)

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

    const INTERVAL = props.interval;
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const modalTimeoutRef = React.useRef<NodeJS.Timeout | null>(null); 

    
    const startTimer = (glider: any): void => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            let index = glider.page;
            if (index < (props.children as any[])?.length - 1) {
                index += 1;
            } else {
                index = 0;
            }
            glider.scrollItem(index);
        }, INTERVAL);
    };

    const callbackRef = React.useCallback((glider: any) => {
        if (glider) {
            setGlider(glider);
            startTimer(glider);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (index: number) => {
        setHoveredSlide((prev)=>{ return index })
    };
    
    const closeModal = () => {
        setHoveredSlide(null);
        setPosition(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
     
        const hoveredElement = document.querySelectorAll(`.${props.name} .glider-slide`)[`${hoveredSlide!}`];        
        
        if (hoveredElement) {
            const bounding = hoveredElement.getBoundingClientRect();
            let centerX = bounding.left + bounding.width / 2;
            let centerY = bounding.top + bounding.height / 2;

            // Modal dimensions (adjust these based on your modal's size)
            const modalWidth = 300; 
            const modalHeight = 300;

            // Viewport dimensions
            const viewportRect = document.documentElement.getBoundingClientRect();
            const margin = 16; 

            // Check if the modal would be out of bounds and adjust
            if (centerX - modalWidth / 2 < viewportRect.left + margin) {
                centerX = viewportRect.left + margin + modalWidth / 2;
            } else if (centerX + modalWidth / 2 > viewportRect.right - margin) {
                centerX = viewportRect.right - margin - modalWidth / 2;
            }

            if (centerY - modalHeight / 2 < viewportRect.top + margin) {
                centerY = viewportRect.top + margin + modalHeight / 2;
            } else if (centerY + modalHeight / 2 > viewportRect.bottom - margin) {
                centerY = viewportRect.bottom - margin - modalHeight / 2;
            }

            setPosition(prev =>{ return { top: centerY, left: centerX }});

            if (hoveredSlide !== null) {
                const result = checkForImageSrc(carouselJson, props.name, hoveredSlide);
                setImageData(result);

                // Clear the previous timeout if any
                if (modalTimeoutRef.current) {
                    clearTimeout(modalTimeoutRef.current);
                }

                // Set a new timeout to open the modal after 300ms
                modalTimeoutRef.current = setTimeout(() => {
                    setIsModalOpen(true);
                }, 300);
            }
        }

        // Cleanup: Clear the timeout if hoveredSlide changes or component unmounts
        return () => {
            if (modalTimeoutRef.current) {
                clearTimeout(modalTimeoutRef.current);
            }
        };
    }, [hoveredSlide, props.name]);

    function checkForImageSrc(carouselJson: { carousels: Carousel[] }, name: string, elementIndex: number): CarouselImage | null {
        const carousel = carouselJson.carousels.find((item: Carousel) => item.name.toLowerCase() === name.toLowerCase());
        if (carousel) {
            if (elementIndex >= 0 && elementIndex < carousel.images.length) {
                return carousel.images[elementIndex];
            }
        }
        
        return null;
    }

    const handleMouseEnterDebounced = debounce(handleMouseEnter, 200);

    return (<>
        {isModalOpen && (
            <SliderModal
                imageSrc={imageData!.src}
                imageAlt={imageData!.description}
                footerText={imageData!.description}
                position={position}
                mousePosition={props.mousePosition}
                isModalOpen={isModalOpen}
                onClose={closeModal}
            />
        )}
        <CarouselHolder visible={loaded}>
            <Glider
                ref={callbackRef}
                hasArrows={true}
                hasDots={props.hasDots !== undefined ? props.hasDots : (props.children as any[])?.length > 1}
                slidesToShow={props.slidesToShow}
                slidesToScroll={props.slidesToScroll}
                rewind
                duration={1}
                iconLeft={<Icon src={IconType.ChevronLeft} width={24} height={24} filter={"invert(100%) brightness(100%) contrast(100%)"} />}
                iconRight={<Icon src={IconType.ChevronRight} width={24} height={24} filter={"invert(100%) brightness(100%) contrast(100%)"} />}
                scrollLock
                dragVelocity={2}
                onSlideVisible={() => startTimer(glider)}
                onLoad={() => setLoaded(true)}
            >
                {React.Children.map(props.children, (child, index) => (
                    <div
                        onMouseEnter={()=> handleMouseEnterDebounced(index)}
                    >
                        {child}
                    </div>
                ))}
                {/* {props.children} */}
            </Glider>
        </CarouselHolder>
    </>);
};

export default Carousel;






// "use client"
// import React, { HTMLAttributes, useState, useEffect } from 'react';
// import Icon, { IconType } from '../ui/icons/icon';
// import Glider from 'react-glider';
// import styled from 'styled-components';

// export interface ICarouselProps extends HTMLAttributes<HTMLElement> {
//     autoplay: boolean;
//     interval: number;
//     hasDots?: boolean;
//     slidesToShow?: number;
//     slidesToScroll?: number;
// }

// interface ICarouselHolder extends React.HTMLAttributes<HTMLDivElement> {
//     visible: boolean;
// }

// const CarouselHolder = styled.div<ICarouselHolder>`
//     position: relative;
//     width: 100%;

//     ${props => !props.visible && "visibility: hidden;"}

//     /* Hide arrows by default */
//     .glider-next, .glider-prev {
//         position: absolute;
//         top: 50%;
//         transform: translateY(-50%); /* Center vertically */
//         width: 32px;
//         height: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         cursor: pointer;
//         z-index: 10;
//         background-color: rgba(0, 0, 0, 0.7); 
//         opacity: 0; /* Initially hidden */
//         transition: opacity 0.3s ease; /* Smooth transition for showing/hiding */
//     }

//     /* Show the prev button when hovering over the first visible item */
//     .glider-slide:first-child:hover ~ .glider-prev {
//         opacity: 1;
//     }

//     /* Show the next button when hovering over the last visible item */
//     .glider-slide:last-child:hover ~ .glider-next {
//         opacity: 1;
//     }

//     /* Show the buttons when hovering over the buttons themselves */
//     .glider-next:hover,
//     .glider-prev:hover {
//         opacity: 1;
//     }

//     /* Optionally, show the buttons when hovering over the entire carousel */
//     .glider:hover .glider-next,
//     .glider:hover .glider-prev {
//         opacity: 1;
//     }

//     & .glider-prev {
//         left: 0px;
//     }

//     & .glider-next {
//         right: 0px; 
//     }

//     & .glider-next.disabled, & .glider-prev.disabled {
//         visibility: hidden;
//     }

//     & .glider-track {
//         display: flex;
//     }
    
//     /* Dots (pagination) styles */
//     & .glider-dots {
//         display: flex;
//         justify-content: flex-end;
//         padding: 1rem 2rem 1rem 2rem;
//         position: relative;
//     }

//     & .glider-dot {
//         width: 20px; 
//         height: 4px; 
//         background-color: gray;
//         border-radius: 2px;
//         margin: 0 5px;
//         cursor: pointer;
//         transition: background-color 0.3s ease, transform 0.3s ease;
//     }

//     & .glider-dot.active {
//         background-color: white; /* Active dot color */
//         transform: scale(1.2); /* Optional: make active dot slightly larger */
//     }

//     /* General styling for each slide */
//     .glider-slide {
//         position: relative;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: 0 .2vw;
//         box-sizing: border-box;
//         white-space: normal;
//         border-radius: 8px;
//         overflow: hidden;
//         transition: transform 0.3s ease;
//         width: 100%;
//         height: 100%;
//     }

//     .glider-slide img {
//         max-width: 100%;
//         max-height: 100%;
//         border-radius: 0.5rem;
//     }
// `;

// const Carousel = (props: ICarouselProps) => {
//     const [glider, setGlider] = useState<any>();
//     const [loaded, setLoaded] = useState<boolean>(false);
//     const [hoveredSlide, setHoveredSlide] = useState<null | number>(null);    

//     const INTERVAL = props.interval;
//     const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    
//     const startTimer = (glider: any): void => {
//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }
//         intervalRef.current = setInterval(() => {
//             let index = glider.page;
//             if (index < (props.children as any[])?.length - 1) {
//                 index += 1;
//             } else {
//                 index = 0;
//             }
//             glider.scrollItem(index);
//         }, INTERVAL);
//     };

//     const callbackRef = React.useCallback((glider: any) => {
//         if (glider) {
//             setGlider(glider);
//             startTimer(glider);
//         }
//     }, []);

//     useEffect(() => {
//         return () => {
//             if (intervalRef.current) {
//                 clearInterval(intervalRef.current);
//             }
//         };
//     }, []);


//     const handleMouseEnter = (index: number) => {
//         setHoveredSlide(index);
//     };
    
//     const handleMouseLeave = () => {
//         setHoveredSlide(null);
//     };
    
//     // console.log("a");
    
    
//     useEffect(() => {
//         if (hoveredSlide !== null) {
//             const hoveredElement = document.querySelector('.glider-slide.hover');
//             if (hoveredElement) {
//                 const bounding = hoveredElement.getBoundingClientRect();
//                 console.log('Bounding Client Rect:', bounding);
//                 // You can now use the bounding information as needed
//             }
//         }
//     }, [hoveredSlide]);


//     return (
//         <CarouselHolder visible={loaded}>
//             <Glider
//                 ref={callbackRef}
//                 hasArrows={true}
//                 hasDots={props.hasDots !== undefined ? props.hasDots : (props.children as any[])?.length > 1}
//                 slidesToShow={props.slidesToShow}
//                 slidesToScroll={props.slidesToScroll}
//                 rewind
//                 duration={1}
//                 iconLeft={<Icon src={IconType.ChevronLeft} width={24} height={24} filter={"invert(100%) brightness(100%) contrast(100%)"} />}
//                 iconRight={<Icon src={IconType.ChevronRight} width={24} height={24} filter={"invert(100%) brightness(100%) contrast(100%)"} />}
//                 scrollLock
//                 dragVelocity={2}
//                 onSlideVisible={() => startTimer(glider)}
//                 onLoad={() => setLoaded(true)}
//             >
//                  {React.Children.map(props.children, (child, index) => (
//                     <div
//                         className={`glider-slide ${hoveredSlide === index ? 'hover' : ''}`}
//                         onMouseEnter={() => handleMouseEnter(index)}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         {child}
//                     </div>
//                 ))}
//                 {/* {props.children} */}
//             </Glider>
//         </CarouselHolder>
//     );
// };

// export default Carousel;