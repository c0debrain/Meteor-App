import { AboutDetail, AboutDetailForm } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'

function noneByDefault(text: string) {
    if (text)
        return text
    else
        return ''
}

function buildAbout(about: AboutDetailForm, userId: string) {
    const newAbout : AboutDetail = {
        image: noneByDefault(about.image),
        idOwner: userId,
        name: about.name,
        company: noneByDefault(about.company),
        jobName: [
            { lang: noneByDefault(about.lang), yourjob: noneByDefault(about.jobName) }
        ],
        mail: noneByDefault(about.mail),
        telMobile: noneByDefault(about.mobile),
        telFix: noneByDefault(about.fix),
        fax: noneByDefault(about.fax),
        aboutYourSelf: [
            { lang: noneByDefault(about.lang), yourself: noneByDefault(about.aboutMe) }
        ],
        address: noneByDefault(about.address),
        facebookLink: noneByDefault(about.facebook),
        githubLink: noneByDefault(about.github),
        twitterLink: noneByDefault(about.twitter),
        dotshareLink: noneByDefault(about.dotshare),
        imgurLink: noneByDefault(about.imgur),
        redditLink: noneByDefault(about.reddit)
    }
    return newAbout
}

function giveThisForm(userId: string) {
    const about = AboutsDetail.findOne({ 'idOwner': userId })
    return about
}

class ExtraLib {

    public addAbout(about: AboutDetailForm, userId: string) {
        const newAbout : AboutDetail = buildAbout(about, userId)
        if (this.hasFound(userId)) {
            console.log('Formulaire will be update...')
            AboutsDetail.update({'idOwner': userId}, newAbout)
        } else {
            console.log('We create a new about form')
            AboutsDetail.insert(newAbout)
        }
    }

    public returnAbout(userId: string) {
        const about = giveThisForm(userId)
        return about
    }

    public hasFound(userId: string) {
        const about = giveThisForm(userId)
        return !!about
    }
}
       
export const extraLib = new ExtraLib()
