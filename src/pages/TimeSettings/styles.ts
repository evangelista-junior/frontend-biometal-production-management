import styled from 'styled-components';

export const TimeSettingsContainer = styled.div`
    margin-top: 8px;
`;

export const ListSettingsByRoutine = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const SingleSettingsRoutine = styled.div`
    padding: 8px;
    margin-right: 4px;
    margin-bottom: 8px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
`;

export const RoutineTitle = styled.h4`
    color: #f58634;
    text-transform: lowercase;
    margin-bottom: 4px;
`;

export const TimeSetting = styled.div`
    margin-bottom: 4px;
`;

export const TimeSettingName = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #878787;
`;

export const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const InputSetting = styled.input`
    width: 80px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #f58634;
    border-radius: 5px;
    color: #0f0f0f;
    font-weight: lighter;
    margin-right: 2px;
`;

export const SettingButton = styled.button<{ buttonType: string }>`
    padding: 4px;
    height: 26px;
    margin-left: 4px;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: white;
    font-weight: lighter;
    transition: 0.3s;
    cursor: pointer;
    background-color: ${(props) =>
        props.buttonType === 'update' ? '#3481F5' : '#F53434'};

    &:hover {
        color: ${(props) => (props.buttonType === 'update' ? 'blue' : 'red')};
        background-color: white;
        border-color: ${(props) =>
            props.buttonType === 'update' ? '#3481F5' : '#F53434'};
    }
`;
