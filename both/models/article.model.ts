import { CollectionObject } from './collection-object.model'

export interface Article extends CollectionObject {
    authorId: string,
    createdAt: Date,
    image: string,
    bloc: [ { 
        title: string, 
        lastEdit?: Date,
        lastEditOwner?: string,
        description: string, 
        lang: string, 
        article: string 
    } ],  
    isPublic: boolean,
    like?: number,
    hate?: number,
    tags?: Array<string>,
    index: number,
    pastToFooter?: boolean
}

export interface ArticleForm {
    title: string,
    description: string,
    lang: string,
    article: string,
    isPublic: boolean
    toFooter: boolean
}
