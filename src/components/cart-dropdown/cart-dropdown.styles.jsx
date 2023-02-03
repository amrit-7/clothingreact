import styled from "styled-components";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  .cart-btn {
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: white;
    color: black;
    border: 1px solid black;
    text-transform: uppercase;
    font-family: "Open Sans";
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: rgb(0, 0, 0);
      color: rgb(255, 243, 243);
      border: 1px solid rgb(255, 255, 255);
    }
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const Cartitem = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  button {
    margin-top: auto;
  }
`;
