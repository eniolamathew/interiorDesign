import theme from "../../style/theme";
import { Heading } from "../../style/topography"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const ModalHolder = styled.div<React.HTMLAttributes<HTMLDivElement>>`
    position: fixed;
    right:0px;
    top:0px;
    left:0px;
    bottom:0px;
    background: rgba(0,0,0,0.5);
    z-index:9999999;
`

const ModalDiv = styled.div< React.HTMLAttributes<HTMLDivElement>>`
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    position: relative;
    width:60vh;
    margin-left:auto;
    margin-right:auto;
    top:50%;
    transform: translateY(-50%);
    z-index:9999999;
    background-color:${theme.colors.backgroundColor};
    max-height:90vh;
    overflow-y:auto;

    @media screen and (max-width: ${theme.breakpoints.md}px) {
        position: fixed;
        width:100%;
        height:100%;
        max-height:none;
    }
    

    & h3 {
        padding:0rem;
        padding-left:2rem;
        padding-right:2rem;
        margin:0px;
    }
`

const CloseButton = styled.div<React.HTMLAttributes<HTMLElement>>`
    position:fixed;
    top:18px;
    right:20px;
    cursor: pointer;
`

interface IModalHeadingProps {
    hasBorder: boolean
}

const ModalHeading = styled(Heading)<IModalHeadingProps>`
    font-size: ${theme.headings.h3.size};
    font-weight: ${theme.headings.h3.weight};
    text-transform: uppercase;
    text-align: center;
    margin-top: 0rem;
    border-bottom: solid ${theme.colors.greyBorder} ${(props: IModalHeadingProps) => props.hasBorder ? "1px":"0px"};
    padding:1.2rem !important;
`;

const Content = styled.div<React.HTMLAttributes<HTMLElement>>`
    padding:1rem;
    flex:1;
`

export interface IModalProps {
    children: any
    title: string
    onClose: () => void
    width?: string
    height?: string
}

const Modal = (props: IModalProps) => {
    const html = document.getElementsByTagName('html')[0]
    const modalHolderRef = useRef<HTMLDivElement>(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        var modal = modalHolderRef.current
        var footer = document.querySelector("#footer")
        if (modal) {
            footer?.appendChild(modal)
            setShow(true)
        }
        html.style.overflow = "hidden"
        document.body.style.paddingRight = "1rem"
        return () => {
            html.style.overflow = ""
            document.body.style.paddingRight = ""
        }
    }, [modalHolderRef.current])

    return <>
        {/* @ts-ignore */}
        <ModalHolder ref={modalHolderRef} style={{ visibility: show ? "visible" : "hidden" }} >
            <ModalDiv onClick={(e: any) => e.preventDefault()} style={{ width: props.width, height: props.height }}>
                <ModalHeading hasBorder={props.title ? true : false}>{props.title}</ModalHeading>
                <CloseButton onClick={props.onClose}>X</CloseButton>
                <Content style={{ top: "0", bottom: "0" }}>{props.children}</Content>
            </ModalDiv>
        </ModalHolder>
    </>
}


export default Modal