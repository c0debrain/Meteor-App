import { Indexes } from '/both/collections/indexes.collection'

Meteor.publish('indexArticle', () => {
    return Indexes.find({_id: 'articleId'},{skip:0,limit:1})
})
