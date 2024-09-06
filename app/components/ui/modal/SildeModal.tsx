import React, { FC, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ISlideModalProps {
    imageSrc: string;
    imageAlt: string;
    footerText: string;
    position: { top: number; left: number } | null;
    mousePosition:{ x: number, y: number } | null;
    isModalOpen: boolean;   
    onClose: () => void; 
}

// Animation for scaling up
const scaleUp = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

// Animation for scaling down
const scaleDown = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0;
  }
`;

const ModalOverlay = styled.div<{ isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0); 
    z-index: 1000;
    display: ${props => (props.isVisible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
    opacity: ${props => (props.isVisible ? 1 : 0)};
`;

const ModalContent = styled.div<{ isClosing: boolean }>`
    position: absolute;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    animation: ${props => (props.isClosing ? scaleDown : scaleUp)} 0.3s ease-out forwards;
`;

const ModalImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const ModalFooter = styled.div`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #ccc;
    text-align: left;
`;

const ModalText = styled.p`
    font-size: 1rem;
    color: #333;
`;

const SlideModal: FC<ISlideModalProps> = ({ imageSrc, imageAlt, footerText, position, isModalOpen, mousePosition, onClose }) => {
    const [openModal, setOpenMdal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                setOpenMdal(false)
                onClose();  
            }, 300); 
            return () => clearTimeout(timer);
        }
    }, [isClosing, onClose]);
    
    if (!isModalOpen && !isClosing) return null;
    
    const handleMouseLeave = () => {
        if (!isClosing) {
            setIsClosing(true); 
        }
    };
    
    const isMouseInsideModal = () => {
        
        const handleMouseMove = (event: MouseEvent) => {
            return { x: event.clientX, y: event.clientY }
        };
        
        window.addEventListener('mousemove', handleMouseMove);

        if (!position || !mousePosition) return false;
        
        const modalLeft = position.left - 150; // Adjust for modal width
        const modalRight = position.left + 150;
        const modalTop = position.top - 150; // Adjust for modal height
        const modalBottom = position.top + 150;
        
        const { x, y } = mousePosition;
        
        return x >= modalLeft && x <= modalRight && y >= modalTop && y <= modalBottom;
    };
    
    // useEffect(() => {
    //     if (!isModalOpen) {
    //         setIsClosing(false);  
    //     }
    // }, [isModalOpen]);

    useEffect(() => {
        // Check mouse position before opening the modal
        if (isModalOpen && isMouseInsideModal()) {
            setOpenMdal(true)
            setIsClosing(false); 
        }
        if (isModalOpen && !isMouseInsideModal()) {
            setOpenMdal(false)
            setIsClosing(true); 
            onClose();  
        }
    }, [isModalOpen, mousePosition]);
    

    return (
        <ModalOverlay isVisible={openModal}>
            <ModalContent
                isClosing={isClosing}
                style={{
                    top: `${position!.top}px`,
                    left: `${position!.left}px`
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseLeave={handleMouseLeave} 
            >
                <ModalImage src={imageSrc} alt={imageAlt} />
                <ModalFooter>
                    <ModalText>{footerText}</ModalText>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

export default SlideModal;