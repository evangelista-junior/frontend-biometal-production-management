import * as C from './styles';

type Props = {
    message: string;
    showModalDeleteLayout: boolean;
    functionToYes: () => void;
    functionToNo: () => void;
};

export const ModalYesOrNo = ({
    message,
    showModalDeleteLayout,
    functionToYes,
    functionToNo,
}: Props) => {
    return (
        <C.Container show={showModalDeleteLayout}>
            <C.ModalContent>
                <C.ModalTitle>{message}</C.ModalTitle>
                <C.ModalButton typeButton="yes" onClick={functionToYes}>
                    Sim
                </C.ModalButton>
                <C.ModalButton typeButton="no" onClick={functionToNo}>
                    Não
                </C.ModalButton>
            </C.ModalContent>
        </C.Container>
    );
};
