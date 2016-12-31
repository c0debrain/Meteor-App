import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { Observable } from 'rxjs/Observable'

import { Extra } from '/both/models/extra.model'
import { Extras } from '/both/collections/extras.collection'
import { UserExt } from '/both/models/userext.model'
import { UsersExt } from '/both/collections/usersext.collection'
import { isRoot } from '/lib/users'

import MarkdownIt = require('markdown-it')
import template from './contact.component.html'
import style from './contact.component.scss'

@Component({
    selector: 'contact',
    template,
    styles: [style]
})

export class ContactComponent implements OnInit {

    extra: Extra
    extrasub: Subscription

    root: Observable<UserExt>
    rootsub: Subscription

    md = new MarkdownIt()

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {

        // TODO : give lang in cookie & set here automaticaly
        if (this.extrasub)
            this.extrasub.unsubscribe()

        this.extrasub = MeteorObservable.subscribe('contact').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.callExtra()
            })
        })

        if (!!Meteor.user()) {
            if (this.rootsub)
                this.rootsub.unsubscribe()

            this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                this.callRoot()
            })
        }
    }

    callExtra() {
        this.extra = Extras.findOne({ 'title': 'contacten' })
    }

    get markdownDisplay() {
        if (this.extra)
            return this.md.render(this.extra.post)
    }

    callRoot() {
        this.root = UsersExt.findOne({'idOwner': Meteor.userId() })
    }

    /* can only update with id... */
    saveContact() {
        if (isRoot(Meteor.userId())) {
            if (this.extra) {
                Extras.update(this.extra._id, {
                    $set: {
                        post: this.extra.post,
                        lastEdit: new Date()
                    }
                })
            }
        }
    }
}
