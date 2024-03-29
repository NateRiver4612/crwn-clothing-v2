import styled from "styled-components";

export const CartIconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    justify-content: center;
    display: flex;
    align-items: center;
    cursor: pointer;


    .shopping-icon{
        width: 26px;
        height: 26px;
    }
`

export const ItemCount = styled.span`
    position: absolute;
    font-size: 13px;
    font-weight: bold;
    bottom: 11px;
`
