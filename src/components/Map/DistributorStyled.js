import styled from 'styled-components';

const MapDiv = styled.div`
  #map {
    height: 100vh;
    .gm-style .gm-style-iw-d  {
        padding: 0px 20px 10px 10px !important;
      }
  }
  select {
    position: absolute;
    top: 70px;
    right: 25px;
    z-index: 9999;
  }
`;

const Description = styled.div`
  position: absolute;
  top: 100px;
  right: 25px;
  z-index: 9999;
  width: 265px;
  .Select-control {
    height: 40px;
    border: 0.4px solid #cdced9;
    border-radius: 4px;
  }
  .Select-value {
    padding: 2px;
    font-weight: 600;
    #react-select-2--value-item{
      color: #6b6c7e;
      line-height: 1.5;
    }
  }
  .Select-clear {
    display: none;
  }
  .counts {
    text-align: center;
    padding: 20px;
    h1 {
      font-size: 24px;
    }
    span {
      color: #6b6c7e;
      font-size: 10px;
      line-height: 10px;
    }
  }
  .show-hide {
    hr {
      border: 1px solid #e7e7ed;
    }
    padding: 0 20px 0 20px;
  }
`;

const Detail = styled.div`
  background: #fff;
  margin-top: 2px;
  border-radius: 4px;
  border-color: #e7e7ed;
  .show-outlets {
    display: inline-block;
    margin: 9px 0;
    font-size: 14px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #272833;
  }
  .reset {
    display: inline-block;
    margin: 9px;
    float: right;
    img {
      cursor: pointer;
    }
  }
`;

export { MapDiv, Description, Detail };
