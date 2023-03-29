import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import * as C from './styles';
import { formatDate } from '../../components/CardSingle';

type listWeekType = (string & string & string & number)[][] | [];
type orderInfo = (number & string & string & number & string & string)[];
type ordersPerWeekType = {
    [key: string]: orderInfo;
};

const Api = useApi();

export const OrderSummary = () => {
    const [listWeeks, setListWeeks] = useState<listWeekType>([]);
    const [insertOrderToList, setInsertOrderToList] = useState<string>('');
    const [ordersPerWeek, setOrdersPerWeek] = useState<ordersPerWeekType>({});

    useEffect(() => {
        const updateStates = async () => {
            await Api.getListWeeksResume().then((response: listWeekType) => {
                setListWeeks(response);

                let lastFiveWeeks = response.slice(0, 5);
                let storeLists = {};
                lastFiveWeeks.forEach(async (week) => {
                    await Api.getListOrdersWeekSelect(week[0]).then((res) => {
                        storeLists = { ...storeLists, ...res };
                    });
                    setOrdersPerWeek(storeLists);
                });
            });
        };
        updateStates();
    }, []);

    useEffect(() => {
        const updateStates = async () => {
            if (insertOrderToList) {
                await Api.getListOrdersWeekSelect(insertOrderToList).then((response) => {
                    setOrdersPerWeek({ ...ordersPerWeek, ...response });
                });
            }
        };
        updateStates();
    }, [insertOrderToList]);

    const handleGetListWeekInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let currentWeekElement = e.currentTarget;
        if (!Object.keys(ordersPerWeek).includes(currentWeekElement.id)) {
            setInsertOrderToList(currentWeekElement.id);
        }
        currentWeekElement.style.scale = '1';
        currentWeekElement.style.border = '1px solid lightsalmon';
        currentWeekElement.style.cursor = 'default';

        let wrapperContentElement = currentWeekElement.children[1] as HTMLDivElement;
        wrapperContentElement.style.display = 'block';
    };

    return (
        <C.ListWeeks>
            {listWeeks.length > 0 && Object.keys(ordersPerWeek).length
                ? listWeeks.map((weekInfo, i) => (
                      <C.CardWeekSingle
                          key={i}
                          id={weekInfo[0]}
                          onClick={(e) => handleGetListWeekInfo(e)}
                      >
                          <C.WrapperHeader>
                              <C.CardHead>
                                  <C.HeadHighlight>Semana {weekInfo[0]}</C.HeadHighlight>{' '}
                                  ({formatDate(weekInfo[1])} - {formatDate(weekInfo[2])})
                                  - {weekInfo[3]} peças
                              </C.CardHead>
                          </C.WrapperHeader>

                          <C.WrapperContent>
                              <C.WrapperContentSingle headerContent={true}>
                                  <C.OrderText>Ordem</C.OrderText>
                                  <C.CodeText>Item</C.CodeText>
                                  <C.DescriptionText>Descrição</C.DescriptionText>
                                  <C.QuantityText>Quantidade</C.QuantityText>
                                  <C.DateText>Data Programada</C.DateText>
                              </C.WrapperContentSingle>

                              {Object.keys(ordersPerWeek).includes(weekInfo[0]) &&
                                  ordersPerWeek[weekInfo[0]].map((orderInfo, i) => (
                                      <C.WrapperContentSingle
                                          key={i}
                                          headerContent={false}
                                      >
                                          <C.OrderText>{orderInfo[0]}</C.OrderText>
                                          <C.CodeText>{orderInfo[1]}</C.CodeText>
                                          <C.DescriptionText>
                                              {orderInfo[2]}
                                          </C.DescriptionText>
                                          <C.QuantityText>{orderInfo[3]}</C.QuantityText>
                                          <C.DateText>
                                              {formatDate(orderInfo[4])}
                                          </C.DateText>
                                      </C.WrapperContentSingle>
                                  ))}
                          </C.WrapperContent>
                      </C.CardWeekSingle>
                  ))
                : ''}
        </C.ListWeeks>
    );
};
