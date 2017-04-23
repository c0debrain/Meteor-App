import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import template from './articles-related.component.html'

@Component({
    selector: 'articles-related',
    template
})

export class ArticlesRelatedComponent implements OnInit, OnDestroy {
    @Input() tags : Array<string>
    @Input() articleId : string
    articles : Observable<Article[]>
    articlesSub : Subscription
    thumbnail : string = 'thumbnail'

    constructor() {}

    ngOnInit() {
        if (this.tags) {
            this.kill()
            this.callArticles()
        }
    }

    private callArticles() {
        this.articlesSub = MeteorObservable.subscribe('articlesRelated', this.articleId, this.tags).subscribe(() => {
            if (this.articleId) {
                this.articles = Articles.find( { '_id': { $nin: [ this.articleId ] } } ).zone()
            }
        }, (err) => { console.log(err) })
    }

    private kill() {
        if (this.articlesSub) 
            this.articlesSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
