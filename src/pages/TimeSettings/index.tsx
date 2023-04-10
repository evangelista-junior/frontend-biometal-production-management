import * as C from './styles';
import { useEffect, useState, MouseEvent } from 'react';
import { useApi } from '../../hooks/useApi';

type settingsType = {
    _id: string;
    CODROTINA: number;
    NOMEROTINA: string;
    INICIOEXPEDIENTE: string;
    FIMEXPEDIENTE: string;
    TEMPOLIMITEESPERA: string | null;
}[];

const Api = useApi();

const formatTime = (time: string | null) => {
    if (time != null) {
        return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
    } else {
        return '';
    }
};

export const TimeSettings = () => {
    const [settings, setSettings] = useState<settingsType>();

    useEffect(() => {
        const updateStates = async () => {
            await Api.getTimeSettings().then((res) => setSettings(res));
        };

        updateStates();
    }, []);

    const updateStartEnd = async (e: MouseEvent<HTMLButtonElement>) => {
        let _idSetting = (
            e.currentTarget.parentNode?.parentNode?.parentNode as HTMLDivElement
        ).id;

        let newStart = (
            document.querySelector(`#${_idSetting} #start`) as HTMLInputElement
        ).value;
        let newEnd = (document.querySelector(`#${_idSetting} #end`) as HTMLInputElement)
            .value;
        if (newStart && newEnd) {
            alert('Horário de expediente atualizado com sucesso !');
            await Api.updateStartEndWorkTime({
                _id: _idSetting.slice(2, _idSetting.length),
                INICIOEXPEDIENTE: newStart,
                FIMEXPEDIENTE: newEnd,
            });
        } else {
            alert('Verifique e preencha corretamente os horários de expediente !');
        }
    };

    const updateWaitTime = async (e: MouseEvent<HTMLButtonElement>) => {
        let _idSetting = (
            e.currentTarget.parentNode?.parentNode?.parentNode as HTMLDivElement
        ).id;

        let newWaitTime = (
            document.querySelector(`#${_idSetting} #wait-time`) as HTMLInputElement
        ).value;

        if (newWaitTime) {
            alert('Tempo de espera atualizado com sucesso !');
            await Api.updateWorkWaitTime({
                _id: _idSetting.slice(2, _idSetting.length),
                TEMPOLIMITEESPERA: newWaitTime,
            });
        } else {
            alert('Verifique e preencha corretamente tempo de espera !');
        }
    };

    const resetWaitTime = async (e: MouseEvent<HTMLButtonElement>) => {
        let _idSetting = (
            e.currentTarget.parentNode?.parentNode?.parentNode as HTMLDivElement
        ).id;

        alert('Tempo de espera atualizado com sucesso !');

        (document.querySelector(`#${_idSetting} #wait-time`) as HTMLInputElement).value =
            '';
        await Api.updateWorkWaitTime({
            _id: _idSetting.slice(2, _idSetting.length),
            TEMPOLIMITEESPERA: '',
        });
    };

    return (
        <C.TimeSettingsContainer>
            <C.ListSettingsByRoutine>
                {settings &&
                    settings.map((setting, i) => (
                        <C.SingleSettingsRoutine key={i} id={`--${setting._id}`}>
                            <C.RoutineTitle>{setting.NOMEROTINA}</C.RoutineTitle>
                            <C.TimeSetting>
                                <C.TimeSettingName>
                                    horário de expediente
                                </C.TimeSettingName>
                                <C.TimeContainer>
                                    <C.InputSetting
                                        type="time"
                                        id="start"
                                        defaultValue={formatTime(
                                            setting.INICIOEXPEDIENTE
                                        )}
                                    />
                                    :
                                    <C.InputSetting
                                        type="time"
                                        id="end"
                                        defaultValue={formatTime(setting.FIMEXPEDIENTE)}
                                    />
                                    <C.SettingButton
                                        buttonType="update"
                                        onClick={(e) => updateStartEnd(e)}
                                    >
                                        atualizar
                                    </C.SettingButton>
                                </C.TimeContainer>
                            </C.TimeSetting>

                            <C.TimeSetting>
                                <C.TimeSettingName>tempo de espera</C.TimeSettingName>
                                <C.TimeContainer>
                                    <C.InputSetting
                                        type="time"
                                        id="wait-time"
                                        defaultValue={formatTime(
                                            setting.TEMPOLIMITEESPERA
                                        )}
                                    />
                                    <C.SettingButton
                                        buttonType="reset"
                                        onClick={(e) => resetWaitTime(e)}
                                    >
                                        remover
                                    </C.SettingButton>
                                    <C.SettingButton
                                        buttonType="update"
                                        onClick={(e) => updateWaitTime(e)}
                                    >
                                        atualizar
                                    </C.SettingButton>
                                </C.TimeContainer>
                            </C.TimeSetting>
                        </C.SingleSettingsRoutine>
                    ))}
            </C.ListSettingsByRoutine>
        </C.TimeSettingsContainer>
    );
};
