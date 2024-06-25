export interface ITag {
    _id: string;
    value: string;
    label: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateTag extends Record<string, unknown>  {
   value: string;
   label: string;
}

export interface IUpdateTagPayload {
    _id: string;
   label: string;
  }
  