import { CollectionObject } from './collection-object.model'

export interface AboutDetail {
    image?: string,
    idOwner: string,
    name: string,
    company?: string,
    aboutCompany?: [{ lang: string, yourCompany: string }],
    jobName?: [{ lang: string, yourjob: string }],
    skill?: string,
    mail?: string,
    telMobile?: string,
    telFix?: string,
    fax?: string,
    aboutYourSelf?: [{ lang: string, yourself: string }],
    address?: string,
    facebook?: string,
    github?: string,
    twitter?: string,
    dotshare?: string,
    imgur?: string,
    reddit?: string
}

export interface AboutDetailForm {
    image?: string,
    name: string,
    lang: string,
    company?: string,
    aboutCompany?: string,
    jobName?: string,
    skill?: string,
    mail?: string,
    mobile?: string,
    fix?: string,
    fax?: string,
    aboutMe?: string,
    address?: string,
    facebook?: string,
    github?: string,
    twitter?: string,
    dotshare?: string,
    imgur?: string,
    reddit?: string
}

export interface HomeDetail extends CollectionObject {
    banner: string
    welcome?: [{ lang?: string, message?: string }],
    idOwner: string
}

export interface HomeDetailForm {
    banner_image : string
    welcome_lang? : string
    welcome_message? : string
}
