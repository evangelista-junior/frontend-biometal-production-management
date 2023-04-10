import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import * as C from './styles';
import $ from 'jquery';
import { CardRow } from '../../components/CardRow';

type registeredLayoutType = {
    [key: string]: [(number & string)[]] | null;
};

export type opInformationType = (
    | (number & string & number & string & string & string)
    | (null & number & string)
    | (null & number & number & string & string & string & string & string & string)
)[];
type listOrdersType = {
    [key: string]: opInformationType[];
};
type motherListOtherType = {
    [key: string]: listOrdersType;
};

type predRealType = {
    [key: string]: (number & number & number & string)[] | [];
};

type motherPredRealType = {
    [key: string]: predRealType;
};

const Api = useApi();

const foundOpAnimation = [
    {
        background: 'radial-gradient(rgba(255, 189, 97, 0.808), rgb(255 28 217))',
    },
];

const getCurrentDate = () => {
    let currentDate = new Date();

    let dafOfWeek = currentDate.getDay();
    let diffDayOfWeek = 5 - dafOfWeek;
    if (diffDayOfWeek < 0) {
        diffDayOfWeek += 7;
    }
    let target = new Date(currentDate.getTime() + diffDayOfWeek * 24 * 60 * 60 * 1000);

    let day = ('0' + target.getDate()).slice(-2);
    let month = ('0' + (target.getMonth() + 1)).slice(-2);
    return `${target.getFullYear()}-${month}-${day}`;
};

const getWeekTarget = (endDate: string) => {
    let currentDate = new Date(endDate);
    let year = currentDate.getFullYear().toString().slice(2, 4);
    let startDayOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
    let weekTimeConverted = 24 * 60 * 60 * 1000;
    let days = Math.ceil((currentDate.getTime() - startDayOfYear) / weekTimeConverted);

    let weekNumber = Math.ceil(days / 7);
    return `${weekNumber}.${year}`;
};

const ProcessMap = () => {
    const [dateFilter, setDateFilter] = useState(getCurrentDate());
    const [registeredLayouts, setRegisteredLayouts] = useState<registeredLayoutType>({});
    const [listRoutines, setListRoutines] = useState<[(number & string)[]] | null>(null);
    const [filteredRoutines, setFilteredRoutines] = useState<
        [(number & string)[]] | null
    >(null);
    const [currentLayout, setCurrentLayout] = useState('null');
    const [checkboxProdAcabado, setCheckboxProdAcabado] = useState(true);
    const [numberSearchOp, setNumberSearchOp] = useState<string>('');
    const [listOrders, setListOrders] = useState<motherListOtherType>({});
    const [listOrdersFiltered, setListOrdersFiltered] = useState<listOrdersType>({});
    const [predReal, setPredReal] = useState<motherPredRealType>({});
    const [filteredPredReal, setFilteredPredReal] = useState<predRealType>({});
    const [showAllRoutines, setShowAllRoutines] = useState<boolean>(false);
    const [updateMapProcess, setUpdateMapProcess] = useState<Date>();

    const weekYearTarget = getWeekTarget(dateFilter);

    useEffect(() => {
        const updateStates = async () => {
            await Api.getLayoutsList().then((res) => {
                setRegisteredLayouts(res);
            });
            await Api.getAllRoutines().then((res: [(number & string)[]] | null) => {
                setListRoutines(res);
                setFilteredRoutines(res);
            });
        };
        updateStates();
    }, []);

    useEffect(() => {
        setInterval(() => {
            let newDateUpdate = new Date();
            if (updateMapProcess !== newDateUpdate) {
                setUpdateMapProcess(newDateUpdate);
            }
        }, 90000);
    });

    useEffect(() => {
        const updateMapProcess = async () => {
            await Api.getOrdersPerProcess(weekYearTarget).then((res) => {
                setListOrders(res);
                setListOrdersFiltered(filterOrders(res, checkboxProdAcabado));
            });
            await Api.getPredictedRealized(weekYearTarget).then((res) => {
                setPredReal(res);
                setFilteredPredReal(res[700]);
            });
        };
        updateMapProcess();
    }, [updateMapProcess]);

    const handleChangeLayout = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let layoutSelected = e.currentTarget.value;
        setCurrentLayout(layoutSelected);
        if (layoutSelected !== 'null') {
            setShowAllRoutines(true);
            setFilteredRoutines(registeredLayouts[layoutSelected]);
        } else {
            setShowAllRoutines(false);
            setFilteredRoutines(listRoutines);
        }
    };

    const scrollToOpSearched = () => {
        let cardOp = document.getElementById(numberSearchOp) as HTMLElement;
        if (cardOp && numberSearchOp) {
            let parentElement = cardOp.parentNode as HTMLElement;
            let routineSearch = parentElement.id;

            $(parentElement).animate({ scrollLeft: cardOp.offsetLeft });

            $('html').animate(
                {
                    scrollTop: cardOp.offsetTop,
                },
                1500
            );

            cardOp.animate(foundOpAnimation, { duration: 1000, iterations: 7 });
        } else {
            alert('Ordem de produção não encontrada !');
        }
        setNumberSearchOp('');
    };

    const filterOrders = (rawList: motherListOtherType, allProductTypes: boolean) => {
        let newList: listOrdersType = {};
        if (!allProductTypes) {
            Object.keys(rawList[700]).forEach((key) => {
                newList[key] = [...rawList[700][key], ...rawList[300][key]];
            });
            return newList;
        } else {
            newList = rawList[700];
            return newList;
        }
    };

    const handleCheckboxProdAcabado = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxProdAcabado(e.currentTarget.checked);
        setListOrdersFiltered(filterOrders(listOrders, e.currentTarget.checked));
        let newFiltered = e.currentTarget.checked ? predReal[700] : predReal[1000];
        setFilteredPredReal(newFiltered);
    };

    const handleDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(e.target.value);
        setUpdateMapProcess(new Date());
    };

    return (
        <C.Container>
            <C.Filters>
                <C.FilterLabel>
                    <C.FilterText>data programada</C.FilterText>
                    <C.FilterInput
                        type="date"
                        value={dateFilter}
                        onChange={(e) => handleDateChanged(e)}
                    />
                </C.FilterLabel>
                <C.FilterLabel>
                    <C.FilterText>layout de exibição</C.FilterText>
                    <C.FilterSelect
                        defaultValue={currentLayout}
                        onChange={handleChangeLayout}
                    >
                        <C.FilterSelectOption value="null">
                            TODAS ROTINAS
                        </C.FilterSelectOption>
                        {registeredLayouts
                            ? Object.keys(registeredLayouts).map((key, index) => (
                                  <C.FilterSelectOption key={index} value={key}>
                                      {key}
                                  </C.FilterSelectOption>
                              ))
                            : ''}
                    </C.FilterSelect>
                </C.FilterLabel>
                <C.FilterLabel>
                    <C.FilterText>apenas prod. acabado</C.FilterText>
                    <C.FilterInput
                        type="checkbox"
                        defaultChecked={checkboxProdAcabado}
                        onChange={(e) => handleCheckboxProdAcabado(e)}
                    />
                </C.FilterLabel>
                <C.FilterLabel>
                    <C.FilterText>pesquisar</C.FilterText>
                    <C.FilterInput
                        placeholder="digite o nº da ordem de produção..."
                        value={numberSearchOp}
                        onChange={(e) => setNumberSearchOp(e.currentTarget.value)}
                    />
                    <C.FilterButton onClick={scrollToOpSearched}>buscar</C.FilterButton>
                </C.FilterLabel>
            </C.Filters>
            <hr></hr>

            {filteredRoutines &&
            Object.keys(listOrdersFiltered).length &&
            Object.keys(filteredPredReal).length
                ? filteredRoutines.map((value, i) => {
                      return (
                          <CardRow
                              key={i}
                              routineNumber={value[0]}
                              routineName={value[1]}
                              listOpsCurrentProcess={listOrdersFiltered[value[0]]}
                              predictedRealized={filteredPredReal[value[0]][0]}
                              showAllRoutines={showAllRoutines}
                              weekYearTarget={weekYearTarget}
                          />
                      );
                  })
                : ''}
        </C.Container>
    );
};

export default ProcessMap;
