export interface Todo {
  id: string
  description: string
  isCompleted: boolean
  deadline: string
}

export interface TodoState {
  todos: Todo[] | any
  loading: boolean
  nbpages: number
  page: number
}
