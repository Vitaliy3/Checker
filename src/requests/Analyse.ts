import { BaseRequest } from "./baseRequestModel";
import { IAnalyse } from "../entities/entities";
class AnalyseRequest extends BaseRequest {

  public getData(url: string): Promise<any> {
    return this.get(url);
  }

}
export default new AnalyseRequest();
