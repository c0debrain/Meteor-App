import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Comments } from '/both/collections/comments.collection'
import { C0mment, CommentFormWithoutLoggin } from '/both/models/comment.model'
import { UsersExt } from '/both/collections/users.collection'
import { UserExt } from '/both/models/user.model'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { incIndex, decIndex } from '/lib/index'
import { isMeteorId } from '/lib/validate'
import { retLang } from '/lib/lang'

function giveTitle(articleId: string, lang: string) {
    if (isMeteorId(articleId)) {
        const article = Articles.findOne({ _id: articleId })
        if (article) 
            return article.lang[retLang('en')].title
    }

    throw new Meteor.Error('404', 'Article not found')
}

function editUserProfile(articleId : string) {
    let title = giveTitle(articleId, 'en')
    let commentList = giveCommentList(title)
    UsersExt.update({ 'idOwner': Meteor.userId() }, {
        $set: {
            comment: commentList
        }
    })
}

function giveCommentList(newtitle : string) {
    var userinfo = UsersExt.findOne({ 'idOwner': Meteor.userId() })
    if (!!userinfo) 
        var newList = new Set(userinfo.comment)
    else 
        throw new Meteor.Error('404', 'GiveComment -> Not Found')

    if (!newList.has(newtitle)) {
        newList.add(newtitle)
    }
    return Array.from(newList)
}
            
Meteor.methods({

    AddComment: function(articleId : string, post : string, son? : string, username? : string) : void {
        const sub = son ? son : ''
        const usr = username ? username : this.userId
        check(articleId, String)
        check(post, String)
        if (son) {
            check(son, String)
        }

        if (Meteor.isServer) {
            const { commentLib } = require('/lib/server/comment')
            commentLib.add(articleId, post, sub, usr)
            if (this.userId)
                editUserProfile(articleId)
        }
    },

    AddCommentWithoutRegister: function(articleId : string, form : CommentFormWithoutLoggin) {
        check(articleId, String)

        if (this.userId)
            throw new Meteor.Error('404', 'bad form, user alrealy logged')

        Meteor.call('AddComment', articleId, form.post, '', form.username)
    },

    EditComment: function(postId : string, newPost : string) {
        check(postId, String)
        check(newPost, String)

        Comments.update(postId, {
            $set: {
                lastposted: new Date(),
                post: newPost
            }
        })
    },

    DelComment: function(postId : string, articleId : string) {
        check(postId, String)
        check(articleId, String)

        if (Meteor.isServer) {
            const { commentLib } = require('/lib/server/comment')
            commentLib.remove(postId, articleId)
        }
    }
})
