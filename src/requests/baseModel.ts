import axios, { AxiosPromise, AxiosResponse } from "axios";

class BaseRequestModel {
  //todo token
  protected get(url: string): any {
    return this.parse(axios.get(url));
  }

  protected post(url: string, data: any): any {
    return this.parse(axios.post(url, data));
  }

  protected put(url: string, data: any): any {
    return this.parse(axios.put(url, data));
  }

  protected depete(url: string): any {
    return this.parse(axios.delete(url));
  }

  private parse(promise: Promise<AxiosResponse<any>>): any {
    promise
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        alert(err);
      });
  }
}

export default new BaseRequestModel()