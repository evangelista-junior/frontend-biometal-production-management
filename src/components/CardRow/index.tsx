import * as C from './styles';
import { CardSingle } from '../CardSingle';
import { opInformationType } from '../../pages/ProcessMap';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';

type Props = {
  routineNumber: number;
  routineName: string;
  listOpsCurrentProcess: opInformationType[];
  predictedRealized: (number & number & number & string)[];
  showAllRoutines: boolean;
  weekYearTarget: string;
};

const Api = useApi();

export const CardRow = ({
  routineNumber,
  routineName,
  listOpsCurrentProcess,
  predictedRealized,
  showAllRoutines,
  weekYearTarget,
}: Props) => {
  const [cardWidth, setCardWidth] = useState(260);
  const [limitWaitTime, setLimitWaitTime] = useState<string | null>(null);

  useEffect(() => {
    Api.getLimitWaitTimeRoutine(routineNumber).then((limitWaitTime) => {
      setLimitWaitTime(limitWaitTime);
    });
  }, []);

  const formatPercent = (number: number) => {
    return number.toFixed(2);
  };

  return (
    <C.Container>
      {(listOpsCurrentProcess.length || showAllRoutines) && predictedRealized ? (
        <C.CardRowContainer id={`${routineNumber}`}>
          <C.CardRowTitle>
            {routineName}
            <C.CardRowTitleInfo>
              {' '}
              {predictedRealized[2]} / {predictedRealized[1]} (
              {formatPercent(predictedRealized[3])}%)
            </C.CardRowTitleInfo>
          </C.CardRowTitle>

          {listOpsCurrentProcess.length > 0 && (
            <>
              <C.CardList id={`${routineNumber}`}>
                {listOpsCurrentProcess.length &&
                  listOpsCurrentProcess.map((opInfo, index: number) => {
                    return (
                      <CardSingle
                        key={index}
                        opInfo={opInfo}
                        cardWidth={cardWidth}
                        limitWaitTime={limitWaitTime}
                      />
                    );
                  })}
              </C.CardList>
            </>
          )}
        </C.CardRowContainer>
      ) : (
        ''
      )}
    </C.Container>
  );
};
