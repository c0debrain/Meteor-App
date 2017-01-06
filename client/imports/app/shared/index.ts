import { DisplayMainImagePipe } from './display-main-image.pipe'
import { DisplayPreviewImage } from './display-preview-image.pipe'
import { DisplayNamePipe } from './display-name.pipe'
import { DisplayReplyCommentPipe } from './display-reply-comment.pipe'
import { DisplayCaptchaPipe } from './display-captcha.pipe'

export const SHARED_DECLARATIONS : any[] = [
    DisplayMainImagePipe,
    DisplayPreviewImage,
    DisplayNamePipe,
    DisplayReplyCommentPipe,
    DisplayCaptchaPipe
]
