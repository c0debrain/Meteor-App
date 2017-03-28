import { Meteor } from 'meteor/meteor'
import { User, UserExt, RegisterUser, UserBar } from '/both/models/user.model'
import { Users, UsersExt } from '/both/collections/users.collection'
import { ninja } from '/server/main.config'
import { indexLib } from '/lib/server/index'

function giveUser(userId? : string) : User {
    let usrId : string = userId ? userId : Meteor.userId()
    return Users.findOne(usrId)
}

function tryFoundProfil(userId: string):void {
    let user = UsersExt.findOne({'idOwner': userId})

    if (!user) {
        createUserProfil(userId)
    } 
}

function createUserProfil(userId: string) {
    let user = giveUser(userId)
    const root = isFirstUser(userId)

    if (user) {
        UsersExt.insert({
            name: user.username,
            idOwner: userId,
            admin: root,
            ban: false,
            created: new Date(),
            lastVisit: new Date(),
            objUser: {},
            isPublic: !root
        })
    }
}

function isFirstUser(userId: string):boolean {
    let user : number = Users.find().cursor.count()
    return (user === 1)
}

function isUserOrEmailAlrealyExist(newNinja : RegisterUser) {
    const user = Users.find({ $or: [
        { username: newNinja.username },
        { 'emails.address': newNinja.email }
    ]})
    return !!(user && user.username || user.email)
}

class UserLib {


    private isLogged() {
        return !!Meteor.userId()
    }

    public returnAdmin(userId: string) {
        let ninja : UserBar

        if (this.isAdmin(userId)) {
            ninja = this.findUserInfoBar()
        }

        return ninja
    }

    public retUserName(userId? : string) {
        let usrId : string = userId ? userId : Meteor.userId()
        let user = giveUser(usrId)
        return user ? user.username : ''
    }

    public findUserInfoBar() {
        tryFoundProfil(Meteor.userId())
        if (this.isLogged()) {
            return this.buildUserBar()
        }
    }

    private buildUserBar() : UserBar {
        let userbar : UserBar = { 
            username : this.retUserName(),
            message : indexLib.returnIndex('mess_'+Meteor.userId())
        }
        return userbar
    }

    //TODO : add filter for username, password and email
    public ctrl(newNinja: RegisterUser) {
        if (Meteor.userId())
            throw new Meteor.Error('404', 'You are alrealy logged')

        if (isUserOrEmailAlrealyExist(newNinja)) 
            throw new Meteor.Error('404', 'username or email alrealy exist')
    }

    public isAdmin(userId : string) : boolean {
        let root = UsersExt.findOne({
            $and: [
                { 'admin': true },
                { 'isPublic': false }
            ]
        })

        if (root)
            return !!(root.idOwner == userId)

        return false
    }

    public isOwner(username: string, userId: string) {
        let user = Users.findOne(userId)
        if (!user)
            throw new Meteor.Error('403', 'Any user found')

        if (user.username != username)
            throw new Meteor.Error('403', 'youre not owner !')

        return UsersExt.findOne({ 'idOwner': userId })
    }

    public rootId() {
        let rootId : string = ''
        const root = Users.findOne({ 
            $and : [
                { username : ninja.username },
                { 'emails.address' : ninja.email }
            ]
        })
        if (root)
            rootId = root._id

        return rootId
    }
}

export const userLib = new UserLib()
