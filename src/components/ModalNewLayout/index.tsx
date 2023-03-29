import * as C from './styles';
import {
    useState,
    useEffect,
    MouseEvent,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import { useApi } from '../../hooks/useApi';

type Props = {
    showModalNewLayout: boolean;
    handleShowModal: () => void;
};

const Api = useApi();

export const ModalNewLayout = ({ showModalNewLayout, handleShowModal }: Props) => {
    const [layoutName, setLayoutName] = useState<string>('');
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
        };
        updateStates();
    }, []);

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
        if (!layoutName) {
            alertsToClient.push('Por favor insira um nome para o layout.');
        }
        if (!listRoutinesAdded.length) {
            alertsToClient.push(
                'Por favor adicione pelo menos uma rotina para visualização.'
            );
        }

        if (!alertsToClient.length) {
            await Api.createLayout({
                LAYOUTNAME: layoutName,
                LAYOUTROUTINES: listRoutinesAdded,
            }).then((res) => {
                alertsToClient.push(res);
            });
        }

        alert(alertsToClient.join('\n'));
        if (alertsToClient[0] === 'Layout criado com sucesso !') {
            window.location.reload();
        }
    };

    return (
        <C.ModalContainer show={showModalNewLayout}>
            <C.ModalContent>
                <C.CloseModal onClick={handleShowModal}>x</C.CloseModal>
                <C.LayoutName
                    placeholder="Insira o nome do Layout"
                    defaultValue={layoutName}
                    onChange={(e) => setLayoutName(e.currentTarget.value.toUpperCase())}
                />
                <C.RoutineSelector
                    onChange={(e) => handleChangeRoutine(e)}
                    defaultValue={selectedRoutine[1]}
                >
                    {listRoutines?.length &&
                        listRoutines.map((routine, i) => (
                            <C.RoutineOption key={i}>{routine[1]}</C.RoutineOption>
                        ))}
                </C.RoutineSelector>
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
                <C.ButtonCreateLayout onClick={createLayout}>
                    criar lista
                </C.ButtonCreateLayout>
            </C.ModalContent>
        </C.ModalContainer>
    );
};
