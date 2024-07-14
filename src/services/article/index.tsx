import { deleteRequest, getRequest, patchRequest, postRequest } from '../axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFormData } from '@/utils/createFormdata';
import { QueryKeys } from '@/constants/query-key';
import { IQuery } from '@/interfaces/IQuery';
import queryString from 'query-string';
import {
  IArticle,
  ICreateArticle,
  IUpdateArticlePayload,
} from '@/interfaces/IArticle';

type TArticlesRes = {
  articleList: IArticle[];
  total: number;
};

type TInitDataRes = {
  tags?: { value: string; label: string }[];
};
const articleUrl = '/article';

const getArticleInitial = async () => {
  const result = await getRequest(`${articleUrl}/get-article-initial`);
  return result.data as TInitDataRes;
};

export const useGetArticleInitial = () => {
  return useQuery({
    queryKey: [QueryKeys.ARTICLE],
    queryFn: () => getArticleInitial(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const getArticleList = async (query: IQuery) => {
  const newParams = { ...query };
  const queryParams = queryString.stringify(newParams ?? {});
  const result = await getRequest(`${articleUrl}?${queryParams}`);
  return result.data as TArticlesRes;
};

export const useGetArticleList = (query: IQuery) => {
  return useQuery({
    queryKey: [QueryKeys.ARTICLE, query],
    queryFn: () => getArticleList(query),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const getArticleById = async (id: string) => {
  const result = await getRequest(`${articleUrl}/${id}`);
  return result.data as IArticle;
};

export const useGetArticleById = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticleById(id),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!id,
  });
};

const createArticle = async (payload: ICreateArticle) => {
  const formData = createFormData(payload);
  const result = await postRequest(`${articleUrl}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data as IArticle;
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: createArticle,
  });
};

// Update

const updateArticle = async (payload: IUpdateArticlePayload) => {
  const { _id, ...rest } = payload;
  const formData = createFormData(rest);
  const result = await patchRequest(`${articleUrl}/${_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data as IArticle;
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: updateArticle,
  });
};

const deleteArticle = async (id: string) => {
  const result = await deleteRequest(`${articleUrl}/${id}`);
  return result.data;
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: deleteArticle,
  });
};
