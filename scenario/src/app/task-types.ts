// No need to change this file
export type Task = {
  name: string,
  due: Date | string,
  complete: boolean,
  description: string,
}

export type TaskAndId = Task & { _id: string }

export type TaskActions = 'CREATE' | 'UPDATE' | 'DELETE' | null;