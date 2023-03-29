import { useState, useEffect, MouseEvent } from 'react';
import { ModalNewLayout } from '../../components/ModalNewLayout';
import { ModalYesOrNo } from '../../components/ModalYesOrNo';
import { useApi } from '../../hooks/useApi';
import * as C from './styles';

const Api = useApi();

type listType = {
    [key: string]: (number & string)[][];
};

export const VisualizationLayouts = () => {
    const [listLayouts, setListLayouts] = useState<listType>({});
    const [showModalDeleteLayout, setShowModalDeleteLayout] = useState<boolean>(false);
    const [showModalNewLayout, setShowModalNewLayout] = useState<boolean>(false);
    const [layoutToDelete, setLayoutToDelete] = useState<string>('');
    const [updateInformation, setUpdateInformation] = useState<Date | null>(null);

    useEffect(() => {
        Api.getListLayouts().then((list) => {
            setListLayouts(list);
        });
    }, [updateInformation]);

    const handleDisplayDeleteModal = () => {
        setShowModalDeleteLayout(!showModalDeleteLayout);
    };

    const handleModalDelete = (e: MouseEvent<HTMLButtonElement>) => {
        handleDisplayDeleteModal();
        let parentElement = e.currentTarget.parentNode?.parentNode as HTMLElement;
        let layout = parentElement.id.replace(' ', '_');
        setLayoutToDelete(layout);
    };

    const deleteLayout = () => {
        Api.deleteLayout(layoutToDelete);
        setLayoutToDelete('');
        handleDisplayDeleteModal();
        setUpdateInformation(new Date());
    };

    const handleDisplayNewModal = () => {
        setShowModalNewLayout(!showModalNewLayout);
    };

    return (
        <C.LayoutsContainer>
            <ModalYesOrNo
                message={`deseja realmente exlcuir o layout ${layoutToDelete} ?`}
                showModalDeleteLayout={showModalDeleteLayout}
                functionToYes={deleteLayout}
                functionToNo={handleDisplayDeleteModal}
            />

            <ModalNewLayout
                showModalNewLayout={showModalNewLayout}
                handleShowModal={handleDisplayNewModal}
            />

            <C.ButtonNewLayout onClick={handleDisplayNewModal}>
                novo layout
            </C.ButtonNewLayout>
            <C.ListLayouts>
                {Object.keys(listLayouts).length > 0 &&
                    Object.keys(listLayouts).map((layout, i) => (
                        <C.LayoutSingle key={i} id={layout}>
                            <C.SingleHead>
                                <C.SingleTitle>{layout}</C.SingleTitle>
                                <C.DeleteLayout onClick={(e) => handleModalDelete(e)}>
                                    excluir
                                </C.DeleteLayout>
                            </C.SingleHead>
                            <C.ListRoutines>
                                {listLayouts[layout].map((routine, j) => (
                                    <C.Routine key={j}>{routine[1]}</C.Routine>
                                ))}
                            </C.ListRoutines>
                        </C.LayoutSingle>
                    ))}
            </C.ListLayouts>
        </C.LayoutsContainer>
    );
};
