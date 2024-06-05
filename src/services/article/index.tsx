// Get articles list

import { getRequest } from "../axios"

const articleUrl = '/article';


const getArticleList = async () => {
    const result = await getRequest(`${}`)
}