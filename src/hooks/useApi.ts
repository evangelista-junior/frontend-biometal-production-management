import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://10.0.0.123:3333',
});

export const useApi = () => ({
    signin: async (user: string, password: string) => {
        const response = await Api.post('/api/v1/authentication/login', {
            user,
            password,
        });
        return response.data;
    },
    validateToken: async (token: string) => {
        const response = await Api.post('/api/v1/authentication/validate-token', {
            token,
        });
        return response.data;
    },
    signout: async () => {
        return { status: true }; //TODO: Remove return
    },
    //Process map requests
    getLayoutsList: async () => {
        const response = await Api.get('/api/v1/visualization-layouts');
        return response.data;
    },
    getAllRoutines: async () => {
        const response = await Api.get('/api/v1/routines-production');
        return response.data;
    },
    getLastOrderNote: async () => {
        const response = await Api.get('/api/v1/process-map/get-last-note');
        return response.data;
    },
    getOrdersPerProcess: async (weekYear: string) => {
        const response = await Api.get(`/api/v1/process-map/${weekYear}`);
        return response.data;
    },
    getPredictedRealized: async (weekYear: string) => {
        const response = await Api.get(
            `/api/v1/process-map/predict-realized/${weekYear}`
        );
        return response.data;
    },
    getLimitWaitTimeRoutine: async (routine: number) => {
        const response = await Api.get(
            `/api/v1/time-settings/limit-time-per-routine/${routine}`
        );
        return response.data;
    },
    getListWeeksResume: async () => {
        const response = await Api.get(`/api/v1/summary/list-weeks`);
        return response.data;
    },
    getListOrdersWeekSelect: async (weekYear: string) => {
        const response = await Api.get(
            `/api/v1/summary/list-orders-per-week/${weekYear}`
        );
        return response.data;
    },
    getLastNotes: async () => {
        const response = await Api.get('/api/v1/get-last-note');
        return response.data;
    },
    getListLayouts: async () => {
        const response = await Api.get('/api/v1/layouts');
        return response.data;
    },
    createLayout: async (postData: {}) => {
        const response = await Api.post(`/api/v1/layouts/create-layout`, postData);
        return response.data;
    },
    deleteLayout: async (layout: string) => {
        const response = await Api.delete(`/api/v1/layouts/delete-layout/${layout}`);
        return response.data;
    },
    getTimeSettings: async () => {
        const response = await Api.get('/api/v1/time-settings');
        return response.data;
    },
    updateStartEndWorkTime: async (patchData: {}) => {
        const response = await Api.patch(
            `/api/v1/time-settings/update-start-end-work`,
            patchData
        );
        return response.data;
    },
    updateWorkWaitTime: async (patchData: {}) => {
        const response = await Api.patch(
            `/api/v1/time-settings/update-wait-time`,
            patchData
        );
        return response.data;
    },
    getUsers: async () => {
        const response = await Api.get('/api/v1/mobile/users');
        return response.data;
    },
    createUser: async (postData: {}) => {
        const response = await Api.post(`/api/v1/mobile/users`, postData);
        return response.data;
    },
    getAvailableUsers: async () => {
        const response = await Api.get('/api/v1/mobile/available-users');
        return response.data;
    },
    deleteUser: async (user: string) => {
        const response = await Api.delete(`/api/v1/mobile/users/${user}`);
        return response.data;
    },
});
