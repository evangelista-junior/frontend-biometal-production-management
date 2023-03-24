import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://10.0.0.123:3333',
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await Api.post('/api/v1/validate-token', { token });
    return response.data;
  },
  signin: async (user: string, password: string) => {
    const response = await Api.post('/api/v1/login', { user, password });
    return response.data;
  },
  signout: async () => {
    return { status: true }; //TODO: Remove return
  },
  //Process map requests
  getLayoutsList: async () => {
    const response = await Api.get('/api/v1/layouts-visualizacao');
    return response.data;
  },
  getAllRoutines: async () => {
    const response = await Api.get('/api/v1/rotinas-de-producao');
    return response.data;
  },
  getLastOrderNote: async () => {
    const response = await Api.get('/api/v1/get-last-note');
    return response.data;
  },
  getOrdersPerProcess: async (weekYear: string) => {
    const response = await Api.get(`/api/v1/process-map/${weekYear}`);
    return response.data;
  },
  getPredictedRealized: async (weekYear: string) => {
    const response = await Api.get(`/api/v1/predict-realized/${weekYear}`);
    return response.data;
  },
  getLimitWaitTimeRoutine: async (routine: number) => {
    const response = await Api.get(`/api/v1/limit-time-per-routine/${routine}`);
    return response.data;
  },
  getListWeeksResume: async () => {
    const response = await Api.get(`/api/v1/summary-list-weeks`);
    return response.data;
  },
  getListOrdersWeekSelect: async (weekYear: string) => {
    const response = await Api.get(`/api/v1/summary-list-orders-per-week/${weekYear}`);
    return response.data;
  },
  getLastNotes: async () => {
    const response = await Api.get('/api/v1/get-last-note');
    return response.data;
  },
});
