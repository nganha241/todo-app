export interface Todos {
  id: string
  description: string
  isCompleted: boolean
  deadline: string
}

export interface TodoState {
  todos: Todos[] | any
  loading: boolean
  fail: Boolean
  succsess: Boolean
}
