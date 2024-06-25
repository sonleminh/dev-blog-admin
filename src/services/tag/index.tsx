import { QueryKeys } from '@/constants/query-key';
import { ICreateTag, ITag, IUpdateTagPayload } from '@/interfaces/ITag';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../axios';

type TTagRes = {
  tags: ITag[];
  total: number;
};

const tagUrl = '/tag';

const getTagList = async () => {
  const result = await getRequest(`${tagUrl}`);
  return result.data as TTagRes;
};

export const useGetTagList = () => {
  return useQuery({
    queryKey: [QueryKeys.ARTICLE],
    queryFn: () => getTagList(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const createTag = async (payload: ICreateTag) => {
  const result = await postRequest(`${tagUrl}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data as ITag;
};

export const useCreateTag = () => {
  return useMutation({
    mutationFn: createTag,
  });
};

// Update

const updateTag = async (payload: IUpdateTagPayload) => {
  const { _id, ...rest } = payload;
  const result = await patchRequest(`${tagUrl}/${_id}`, rest, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data as ITag;
};

export const useUpdateTag = () => {
  return useMutation({
    mutationFn: updateTag,
  });
};

const deleteTag = async (id: string) => {
  const result = await deleteRequest(`${tagUrl}/${id}`);
  return result.data;
};

export const useDeleteTag = () => {
  return useMutation({
    mutationFn: deleteTag,
  });
};
