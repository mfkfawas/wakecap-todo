import { AxiosError } from 'axios';

export const handleApiError = (err: unknown) => {
  if (err instanceof AxiosError) {
    console.error(err.response?.data);
  } else {
    console.error(err);
  }
};
