import { PathsType } from '../constants/paths/userPaths';

export abstract class BaseServices<T> {
  protected readonly baseURL: string = import.meta.env.VITE_API_URL;
  protected readonly PATHS: PathsType;

  constructor({ paths }: { paths: PathsType }) {
    this.PATHS = paths;
    console.log(this.baseURL);
  }

  async getById(id: number): Promise<T> {
    return fetch(`${this.baseURL}${this.PATHS.GET_BY_ID}/${id}`).then(
      async (data) => {
        if (!data.ok) throw new Error();

        return data.json();
      }
    );
  }

  async deleteById(id: number) {
    return fetch(`${this.baseURL}${this.PATHS.DELETE_BY_ID}/${id}`, {
      method: 'DELETE',
    });
  }
}
