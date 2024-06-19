// Get articles list

import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { deleteRequest, getRequest, postRequest } from '../axios';
import { IArticle, ICreateArticle } from '../../interfaces/IArticle';
import { createFormData } from '@/utils/createFormdata';

type TArticlesRes = {
  articleList: IArticle[];
};

type TArticlesDeleteRes = {
  deleteCount: number;
};

type ArticleMutateOptions = Omit<
  UseMutationOptions<IArticle, Error, ICreateArticle, unknown>,
  'mutationFn'
>;

const articleUrl = '/article';

const getArticleList = async () => {
  const result = await getRequest(`${articleUrl}`);
  return result.data as TArticlesRes;
};

export const useGetArticleList = () => {
  return useQuery({
    queryKey: ['article'],
    queryFn: getArticleList,
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

export const useCreateArticle = (options: ArticleMutateOptions) => {
  return useMutation({
    ...options,
    mutationFn: createArticle,
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
