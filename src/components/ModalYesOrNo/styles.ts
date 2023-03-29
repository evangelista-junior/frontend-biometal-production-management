import styled from 'styled-components';

export const Container = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? `block` : 'none')};
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background-color: white;
    text-align: center;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    padding: 5px;
`;

export const ModalTitle = styled.p`
    margin-bottom: 8px;
    color: #264653;
`;

export const ModalButton = styled.button<{ typeButton: string }>`
    width: 48%;
    padding: 4px;
    margin-right: 4px;
    cursor: pointer;
    background-color: white;
    border-radius: 10px;
    transition: 0.3s;
    border: 1px solid ${(props) => (props.typeButton === 'yes' ? 'green' : 'red')};
    color: ${(props) => (props.typeButton === 'yes' ? 'green' : 'red')};

    &:hover {
        background-color: ${(props) =>
            props.typeButton === 'yes' ? '#9fff99' : '#ff9f99'};
    }
`;
