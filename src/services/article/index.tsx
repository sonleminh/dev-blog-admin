// Get articles list

import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../axios';
import { IArticle } from '../../interfaces/IArticle';

type TArticleRes = {
  articleList: IArticle[];
};

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
