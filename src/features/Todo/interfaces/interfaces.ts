export interface ITodos {
  id: string
  description: string
  isCompleted: boolean
  deadline: string
}

export interface ITodoState {
  todos: ITodos[]
  loading: Boolean
  fail: Boolean
  succsess: Boolean
}
