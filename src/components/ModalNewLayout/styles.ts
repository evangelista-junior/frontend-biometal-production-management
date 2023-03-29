import styled from 'styled-components';

export const ModalContainer = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? `block` : 'none')};
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
    width: 100%;
    max-width: 350px;
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

export const CloseModal = styled.p`
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
    background-color: #a0a0a0;
    opacity: 0.6;
    text-align: center;
    border-end-start-radius: 10px;
    color: white;
    transition: 0.3s;
    padding: 2px;

    &:hover {
        opacity: 1;
    }
`;

export const LayoutName = styled.input`
    width: 100%;
    text-transform: uppercase;
    padding: 5px;
    margin: 5px 0;
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    margin-right: 2px;
`;

export const RoutineSelector = styled.select`
    width: 88%;
    padding: 5px;
    margin: 5px 0;
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    margin-right: 2px;
`;

export const RoutineOption = styled.option``;

export const ButtonAddRoutine = styled.button`
    cursor: pointer;
    width: 10%;
    padding: 5px;
    margin: 5px 0;
    border: 1px solid green;
    border-radius: 5px;
    margin-right: 2px;
    transition: 0.3s;
    color: green;
    background-color: white;

    &:hover {
        border-radius: 10px;
        background-color: green;
        color: white;
    }
`;

export const ListAddedRoutine = styled.div`
    height: 300px;
    overflow-y: scroll;
`;

export const AddedRoutineSingle = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
`;

export const RoutineName = styled.p`
    text-transform: lowercase;
    font-weight: lighter;
    font-size: 16px;
`;

export const ButtonRemoveRoutine = styled.button`
    cursor: pointer;
    width: 10%;
    padding: 5px;
    margin: 5px 0;
    border: 1px solid lightcoral;
    border-radius: 5px;
    margin-right: 2px;
    background-color: white;
    transition: 0.3s;
    color: red;

    &:hover {
        background-color: red;
        color: white;
        border-radius: 10px;
    }
`;

export const ButtonCreateLayout = styled.button`
    cursor: pointer;
    width: 100%;
    padding: 5px;
    margin: 5px 0;
    border: 1px solid lightsalmon;
    border-radius: 5px;
    margin-right: 2px;
    transition: 0.3s;
    background-color: rgb(245, 134, 52);
    color: white;
    font-weight: lighter;

    &:hover {
        border-radius: 10px;
        box-shadow: 0 0 5px #919191;
        font-weight: bold;
    }
`;
