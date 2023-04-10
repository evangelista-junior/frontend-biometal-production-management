import * as C from './styles';
import { opInformationType } from '../../pages/ProcessMap';

type Props = {
    opInfo: opInformationType;
    cardWidth: number;
    limitWaitTime: string | null;
};

const formatDateTime = (date: string) => {
    if (date == null) {
        return 'Invalid Date';
    } else {
        return new Date(date).toLocaleDateString('pt-BR', {
            hour: 'numeric',
            minute: 'numeric',
        });
    }
};

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
};

const formatName = (name: string) => {
    if (name.length > 27) {
        return name.slice(0, 27) + '...';
    }
    return name;
};

const calculateWaitTime = (
    startDate: string | number | Date,
    endDate: string | number | Date
) => {
    let timeDiff = (new Date(startDate).getTime() - new Date(endDate).getTime()) / 1000;
    let diasDiff = Math.floor(timeDiff / 60 / 60 / 24);
    let hourDiff = ('00' + Math.floor((timeDiff / 60 / 60) % 24)).slice(-2);
    let minDiff = ('00' + Math.floor((timeDiff / 60) % 60)).slice(-2);
    let secDiff = ('00' + Math.floor(timeDiff % 60)).slice(-2);
    return `${diasDiff}(d) - ${hourDiff}:${minDiff}:${secDiff}`;
};

export const CardSingle = ({ opInfo, cardWidth, limitWaitTime }: Props) => {
    const timeFinishedLastOperation = formatDateTime(opInfo[10]);

    return (
        <C.SingleCard cardWidth={cardWidth} status={opInfo[19]} id={opInfo[1]}>
            <C.SingleCardTitle>{opInfo[1] + '/' + opInfo[7]}</C.SingleCardTitle>
            <C.SubheadCodDescription weight="bold">
                {opInfo[2] + ' - '}
            </C.SubheadCodDescription>
            <C.SubheadCodDescription weight="lighter">
                {opInfo[3]}
            </C.SubheadCodDescription>

            <C.Subhead>Data programada:</C.Subhead>
            <C.SubheadInfo>{formatDate(opInfo[4])}</C.SubheadInfo>

            {opInfo[19] === 2 && (
                <>
                    <C.Subhead>Máquina:</C.Subhead>
                    <C.SubheadInfo>
                        {formatName(opInfo[13] + ' - ' + opInfo[18])}
                    </C.SubheadInfo>

                    <C.Subhead>Data de início:</C.Subhead>
                    <C.SubheadInfo>{formatDateTime(opInfo[9])}</C.SubheadInfo>
                </>
            )}

            <C.Subhead>Quantidade:</C.Subhead>
            <C.SubheadInfo>{opInfo[11]}</C.SubheadInfo>

            {timeFinishedLastOperation != 'Invalid Date' && (
                <>
                    <C.Subhead>Término operação anterior:</C.Subhead>
                    <C.SubheadInfo>{timeFinishedLastOperation}</C.SubheadInfo>

                    <C.Subhead>Disponivel a:</C.Subhead>
                    <C.SubheadInfo>
                        {calculateWaitTime(new Date(), opInfo[15])}
                    </C.SubheadInfo>
                </>
            )}

            <C.Subhead>Colaborador:</C.Subhead>
            <C.SubheadInfo>
                {opInfo[19] === 2 ? formatName(opInfo[17]) : 'Aguardando início ...'}
            </C.SubheadInfo>
        </C.SingleCard>
    );
};
