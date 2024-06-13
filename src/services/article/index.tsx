// Get articles list

import { MutateOptions, useMutation, useQuery } from '@tanstack/react-query';
import { getRequest, postRequest } from '../axios';
import { IArticle, ICreateArticle } from '../../interfaces/IArticle';

type TArticleRes = {
  articleList: IArticle[];
};

type useMutateOptions = Omit<MutateOptions<createArticle>, 'mutationFn'>;

const articleUrl = '/article';

const getArticleList = async () => {
  const result = await getRequest(`${articleUrl}`);
  return result.data as TArticleRes;
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
  const result = await postRequest(`${articleUrl}`, payload);
  return result.data as TArticleRes;
};

export const useCreateArticle = (options: useMutateOptions) => {
  return useMutation({
    ...options,
    mutationFn: createArticle,
  });
};
