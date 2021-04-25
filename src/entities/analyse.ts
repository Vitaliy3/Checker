export default class Analyse {
  private id: number
  private name: string
  private status: string
  private loadDate: Date
  private tasks: Task[]

  constructor(id: number, name: string, status: string, loadDate: Date) {
    this.id = id
    this.name = name
    this.status = status
    this.loadDate = loadDate
  }

  private getAllBanks(): Promise<Analyse[]> {
    return new Promise((res) => {
      const analyse: Analyse = new Analyse(1, "b1", "ok", new Date())
      res([analyse])
    })
  }
  // private sendByEmail(bankId: number, email: string): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private upload(file: File): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private downloadAnalysed(bankId: number): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private downloadRaw(bankId: number): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private rename(bankId: number, newName: string): Promise<Analyse> {
  //   return new Promise(() => {})
  // }
}

export class Task {
  private id: number
  private levelOfPreparadness: number[]
  private executionFrequency: number[]
  private birnbaumPlus: number[]
  private birnbaumMinus: number[]

  constructor(
    id: number,
    levelOfPreparadness: number[],
    executionFrequency: number[],
    birnbaumPlus: number[],
    birnbaumMinus: number[]
  ) {
    this.id = id
    this.levelOfPreparadness = levelOfPreparadness
    this.executionFrequency = executionFrequency
    this.birnbaumPlus = birnbaumPlus
    this.birnbaumMinus = birnbaumMinus
  }

  private getTasksByBankId(id: number): Promise<Task[]> {
    return new Promise((res) => {
      const tasks: Task[] = []
      tasks.push(new Task(1, [1], [1], [1], [1]))
      tasks.push(new Task(2, [2], [1], [1], [1]))
      tasks.push(new Task(3, [3], [1], [1], [1]))

      res(tasks)
    })
  }
  // private analyseTask(bankId: number, taskId: number): Promise<Task[]> {
  //   return new Promise(() => {})
  // }
}
