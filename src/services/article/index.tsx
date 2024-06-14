// Get articles list

import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getRequest, postRequest } from '../axios';
import { IArticle, ICreateArticle } from '../../interfaces/IArticle';
import { createFormData } from '@/utils/createFormdata';

type TArticlesRes = {
  articleList: IArticle[];
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
    refetchOnMount: false,
    refetchInterval: false,
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
