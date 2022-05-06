import styled from "styled-components";

export const Total = styled.span`
  .total {
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
  }
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;
  &:last-child {
    width: 8%;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgray;
`;

export const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px auto 0;
`;
