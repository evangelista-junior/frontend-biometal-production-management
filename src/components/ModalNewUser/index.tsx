import * as C from './styles';
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useApi } from '../../hooks/useApi';

type Props = {
    showModalNewUser: boolean;
    handleShowModal: () => void;
};

const Api = useApi();

export const ModalNewUser = ({ showModalNewUser, handleShowModal }: Props) => {
    const [availableUsers, setAvailableUsers] = useState<string[][]>([]);
    const [selectedUser, setSelectedUser] = useState<string[] | []>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [selectedUserName, setSelectedUserName] = useState<string>('');
    const [listRoutines, setListRoutines] = useState<(number & string)[][] | []>([]);
    const [selectedRoutine, setSelectedRoutine] = useState<(number & string)[] | []>([]);
    const [listRoutinesAdded, setListRoutinesAdded] = useState<
        (number & string)[][] | []
    >([]);

    useEffect(() => {
        const updateStates = async () => {
            await Api.getAllRoutines().then((res: [(number & string)[]] | null) => {
                if (res) {
                    setListRoutines(res);
                    setSelectedRoutine(res[0]);
                }
            });
            await Api.getAvailableUsers().then((res: string[][] | null) => {
                if (res) {
                    setAvailableUsers(res);
                    setSelectedUser(res[0]);
                    setSelectedUserId(res[0][0]);
                    setSelectedUserName(res[0][1]);
                }
            });
        };
        updateStates();
    }, []);

    const handleChangeUser = (e: ChangeEvent<HTMLSelectElement>) => {
        let user = availableUsers?.filter((u) => u[1] === e.currentTarget.value)[0];
        setSelectedUser(user);
        setSelectedUserId(user[0]);
        setSelectedUserName(user[1]);
    };

    const handleChangeRoutine = (e: ChangeEvent<HTMLSelectElement>) => {
        let routine = listRoutines?.filter(
            (routine) => routine[1] === e.currentTarget.value
        )[0];
        setSelectedRoutine(routine);
    };

    const addRoutineToList = (e: MouseEvent<HTMLButtonElement>) => {
        if (listRoutines.length > 0) {
            let nextRoutine: (number & string)[] | [] = [];

            if (listRoutines.length > 1) {
                listRoutines.map((routine, i) => {
                    if (routine[0] === selectedRoutine[0]) {
                        if (i + 1 === listRoutines.length) {
                            nextRoutine = listRoutines[0];
                        } else {
                            nextRoutine = listRoutines[i + 1];
                        }
                    }
                });
            }

            let routineToAdd = listRoutines.filter(
                (routine) => routine[0] === selectedRoutine[0]
            );
            let newRoutinesAdded = [...listRoutinesAdded, ...routineToAdd];
            setListRoutinesAdded(newRoutinesAdded);
            let newRoutinesSelect = listRoutines.filter(
                (routine) => routine[0] !== selectedRoutine[0]
            );
            setListRoutines(newRoutinesSelect);
            setSelectedRoutine(nextRoutine);
        }
    };

    const removeRoutineToList = (e: MouseEvent<HTMLButtonElement>) => {
        let parentElement = e.currentTarget.parentNode as HTMLElement;
        let routineToRemove = listRoutinesAdded?.filter(
            (routine) => routine[0] === parseInt(parentElement.id)
        )[0];

        let newRoutinesAdded = listRoutinesAdded.filter(
            (routine) => routine !== routineToRemove
        );
        setListRoutinesAdded(newRoutinesAdded);
        let newRoutinesSelect = [...listRoutines, ...[routineToRemove]];
        setListRoutines(newRoutinesSelect);
    };

    const createLayout = async () => {
        let alertsToClient = [];
        if (!listRoutinesAdded.length) {
            alertsToClient.push(
                'Por favor adicione pelo menos uma rotina para visualização.'
            );
        }

        if (!alertsToClient.length) {
            await Api.createUser({
                IDENTIFICACAO: selectedUserId,
                NOME: selectedUserName,
                ROTINAS: listRoutinesAdded,
            }).then((res) => {
                alertsToClient.push(res);
            });
        }

        alert(alertsToClient.join('\n'));
        if (alertsToClient[0] === 'Usuário cadastrado com sucesso !') {
            window.location.reload();
        }
    };

    return (
        <C.ModalContainer show={showModalNewUser}>
            <C.ModalContent>
                <C.CloseModal onClick={handleShowModal}>x</C.CloseModal>
                <C.Selector
                    width={100}
                    onChange={(e) => handleChangeUser(e)}
                    defaultValue={selectedRoutine[1]}
                >
                    {availableUsers?.length &&
                        availableUsers.map((user, i) => (
                            <C.SelectorOption key={i}>{user[1]}</C.SelectorOption>
                        ))}
                </C.Selector>

                <C.Selector
                    width={88}
                    onChange={(e) => handleChangeRoutine(e)}
                    defaultValue={selectedRoutine[1]}
                >
                    {listRoutines?.length &&
                        listRoutines.map((routine, i) => (
                            <C.SelectorOption key={i}>{routine[1]}</C.SelectorOption>
                        ))}
                </C.Selector>
                <C.ButtonAddRoutine onClick={(e) => addRoutineToList(e)}>
                    +
                </C.ButtonAddRoutine>
                <C.ListAddedRoutine>
                    {listRoutinesAdded.map((routine, i) => (
                        <C.AddedRoutineSingle key={i} id={routine[0]}>
                            <C.RoutineName>{routine[1]}</C.RoutineName>
                            <C.ButtonRemoveRoutine
                                onClick={(e) => removeRoutineToList(e)}
                            >
                                -
                            </C.ButtonRemoveRoutine>
                        </C.AddedRoutineSingle>
                    ))}
                </C.ListAddedRoutine>
                <C.ButtonCreateUser onClick={createLayout}>
                    adicionar usuário
                </C.ButtonCreateUser>
            </C.ModalContent>
        </C.ModalContainer>
    );
};
