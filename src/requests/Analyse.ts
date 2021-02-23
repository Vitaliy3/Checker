import { BaseRequest } from "./baseRequestModel";
import { IAnalyse } from "../entities/entities";
class AnalyseRequest extends BaseRequest {
  public getData(url: string): Promise<any> {
    return this.get(url);
  }

  // public getResult (id:number){

  // }
  // public update (data:any){

  // }
}
export default new AnalyseRequest();
