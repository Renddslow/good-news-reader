import React from 'react';
import styled from 'styled-components';

const Modal = styled.dialog`
  padding: 32px 24px;
  top: 200px;
  border-radius: 4px;
  border: 2px dashed #523af2;
  background: #a398f8;
  color: #fff;
  font-family: var(--sans-serif);
  font-size: 24px;
  font-weight: 600;
  width: 90%;
  left: 5%;
`;

const OopsModal = ({ definition }) => {
  return (
    <Modal className="oops-modal" open>
      <p>
        Oops! That word means “{definition}” and another word in this list means the same thing! Try
        again!
      </p>
    </Modal>
  );
};

export default OopsModal;
