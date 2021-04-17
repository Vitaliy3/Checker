
export class Analyse {
    private id: number
    private name: string
    private status: string
    private loadDate: Date
    private tasks: Task[]
  
    constructor() {}
  
    private getAllBanks(): Promise<Analyse[]> {
      return new Promise(() => {})
    }
    private sendByEmail(bankId: number, email: string): Promise<boolean> {
      return new Promise(() => {})
    }
    private upload(file: File): Promise<boolean> {
      return new Promise(() => {})
    }
    private downloadAnalysed(bankId: number): Promise<boolean> {
      return new Promise(() => {})
    }
    private downloadRaw(bankId: number): Promise<boolean> {
      return new Promise(() => {})
    }
    private rename(bankId: number, newName: string): Promise<Analyse> {
      return new Promise(() => {})
    }
  }
  
  export class Task {
    private id: number
    private levelOfPreparadness: number[]
    private executionFrequency: number[]
    private birnbaumPlus: number[]
    private birnbaumMinus: number[]
  
    constructor() {}
  
    private getTasksByBankId(id: number): Promise<Task[]> {
      return new Promise(() => {})
    }
    private analyseTask(bankId: number, taskId: number): Promise<Task[]> {
      return new Promise(() => {})
    }
  }