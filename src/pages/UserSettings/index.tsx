import { useState, useEffect, MouseEvent } from 'react';
import { ModalYesOrNo } from '../../components/ModalYesOrNo';
import { useApi } from '../../hooks/useApi';
import * as C from './styles';
import { ModalNewUser } from '../../components/ModalNewUser';

type userType = {
    _id: string;
    IDENTIFICACAO: string;
    NOME: string;
    ROTINAS: (number & string)[][];
}[];

type listType = {
    [key: string]: (number & string)[][];
};

const Api = useApi();

export const UserSettings = () => {
    const [users, setUsers] = useState<userType>([]);
    const [listLayouts, setListLayouts] = useState<listType>({});
    const [showModalDeleteLayout, setShowModalDeleteLayout] = useState<boolean>(false);
    const [showModalNewLayout, setShowModalNewLayout] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<string>('');

    useEffect(() => {
        const updateStates = async () => {
            await Api.getUsers().then((users) => {
                setUsers(users);
            });
            await Api.getListLayouts().then((list) => {
                setListLayouts(list);
            });
        };
        updateStates();
    }, []);

    const handleDisplayDeleteModal = () => {
        setShowModalDeleteLayout(!showModalDeleteLayout);
    };

    const handleModalDelete = (e: MouseEvent<HTMLButtonElement>) => {
        handleDisplayDeleteModal();
        let parentElement = e.currentTarget.parentNode?.parentNode as HTMLElement;
        let user = parentElement.id.replace(' ', '_');
        setUserToDelete(user);
    };

    const deleteLayout = async () => {
        Api.deleteUser(userToDelete);
        setUserToDelete('');
        handleDisplayDeleteModal();
        window.location.reload();
    };

    const handleDisplayNewModal = () => {
        setShowModalNewLayout(!showModalNewLayout);
    };

    return (
        <C.UsersContainer>
            <ModalYesOrNo
                message={`deseja realmente remover o usuário selecionado ?`}
                showModalDeleteLayout={showModalDeleteLayout}
                functionToYes={deleteLayout}
                functionToNo={handleDisplayDeleteModal}
            />

            <ModalNewUser
                showModalNewUser={showModalNewLayout}
                handleShowModal={handleDisplayNewModal}
            />

            <C.ButtonNewUser onClick={handleDisplayNewModal}>
                novo usuario
            </C.ButtonNewUser>
            <C.ListUsers>
                {users.length > 0 &&
                    users.map((user, i) => (
                        <C.UserSingle key={i} id={user._id}>
                            <C.SingleHead>
                                <C.SingleTitle>{user.NOME}</C.SingleTitle>
                                <C.DeleteLayout onClick={(e) => handleModalDelete(e)}>
                                    remover
                                </C.DeleteLayout>
                            </C.SingleHead>
                            <C.ListRoutines>
                                {user.ROTINAS.map((routine, j) => (
                                    <C.Routine key={j}>{routine[1]}</C.Routine>
                                ))}
                            </C.ListRoutines>
                        </C.UserSingle>
                    ))}
            </C.ListUsers>
        </C.UsersContainer>
    );
};
