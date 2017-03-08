import { Meteor } from 'meteor/meteor'
import { SecretCaptcha, CaptchaForm } from '/both/models/captcha.model'
import { RegisterUser } from '/both/models/user.model'

Meteor.methods({

    secretCaptcha: function(getCount: number) {
        check(getCount, Number)
        let captcha : SecretCaptcha = { hash: '', question: '' }

        if (Meteor.isServer) {
            const { captchaLib } = require('/lib/server/captcha')
            let genId = captchaLib.randomCaptcha(getCount)
            captcha.hash = captchaLib.hash(genId)
            captcha.question = captchaLib.question(genId)
        }

        return captcha
    },

    checkValidHash: function(captcha: SecretCaptcha) {
        if (Meteor.isServer) {
            const { captchaLib } = require('/lib/server/captcha')
            if (!captchaLib.controlValidHash(captcha)) {
                throw new Meteor.Error('201', 'new captcha regenerate')
            }
        }
    },

    controlResponse: function(captchaForm: CaptchaForm) {
        check(captchaForm.question, String)
        check(captchaForm.response, String)

        if (Meteor.isServer) {
            const { captchaLib } = require('/lib/server/captcha')

            if (!captchaLib.ctrlCaptchaForm(captchaForm))
                throw new Meteor.Error('400', 'Bad response')
        }
    },

    registerUserFrom: function(newNinja: RegisterUser, 
                               captcha: SecretCaptcha,
                               captchaForm: CaptchaForm) {

        Meteor.call('checkValidHash', captcha)
        Meteor.call('controlResponse', captchaForm)
        Meteor.call('controlNewNinja', newNinja)

        return newNinja
    },

    validCaptcha: function(captcha : SecretCaptcha, res : string) {
        check(res, String)

        const captchaForm = { question: captcha.question , response: res }

        Meteor.call('checkValidHash', captcha)
        Meteor.call('controlResponse', captchaForm)
    }
})
