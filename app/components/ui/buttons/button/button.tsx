import theme from "../../../style/theme";
import styled from "styled-components";
import { TextButton } from "../textButton/textbutton.s";

export const Button = styled(TextButton)`
    font-weight: ${theme.button.weight};
    font-size: 1.2rem;
    padding: 0.5rem 0 0.5rem;
    text-align: center;
    background-color: var(--colour-red);
    border-radius: 6px;
    display: flex;
    align-items: ceter;
    justify-content: center;
`;