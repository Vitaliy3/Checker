import baseModel from "./baseModel";
class AnalyseModel extends baseModel{

    public getData(url:string):Promise<any>{
        return this.get(url)
    }

    // public getResult (id:number){

    // }
    // public update (data:any){

    // }
}
export default new AnalyseModel