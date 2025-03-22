import { AxiosError } from 'axios';

export const handleApiError = (err: unknown) => {
  if (err instanceof AxiosError) {
    console.error(err.response?.data);
  } else {
    console.error(err);
  }
};

export const COUNT_ENTITY = {
  DELETED: 'deleted',
  COMPLETED: 'completed',
  TOTAL: 'total',
} as const;
