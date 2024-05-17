import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-secondary);
  z-index: 9999; 
`;
const Loader = styled(CircularProgress)`
  color: var(--bg-primary); 
`;
export default function CustomLoader() {
  return (
    <LoaderContainer>
        <Loader size={100} thickness={2} />
    </LoaderContainer>
  );
}
