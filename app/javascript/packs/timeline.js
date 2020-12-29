import $ from 'jquery'
import axios from 'modules/axios'
import {
    listenInactiveHeartEvent,
    listenActiveHeartEvent
} from 'modules/handle_heart'

// like def
const handleHeartDisplay = (hasLiked) => {
    if (hasLiked) {
        $('.active-heart').removeClass('hidden')
    } else {
        $('.inactive-heart').removeClass('hidden')
    }
}

// comment def
const handleCommentForm = () => {
    $('.show_comment_form').on('click', () => {
      $('.show_comment_form').addClass('hidden')
      $('.comment_text_area').removeClass('hidden')
    })
  }
  
  
  const appendNewComment = (comment, user) => {
    $('.comment-info').append(
      `<div class="user-account"><p>${(comment.content)}</p></div>`
    )
    $('.comment-info').append(
      `<div class="comment-content"><p>${(comment.user_name)}</p></div>`
    )
    $('.comment-image').append(
      `<div><img class="comment-avatar"src="${(comment.avatar_image)}"</img></div>`
    )
  }
  
// comment func
  document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId
    axios.get(`/api/articles/${articleId}/comments`)
      .then((response) => {
        const comments = response.data
        comments.forEach((comment) => {
          appendNewComment(comment)
        })
      })
  
      handleCommentForm()
  
    $('.add_comment_btn').on('click', () => {
      const content = $('#comment_content').val()
      if (!content) {
        window.alert('コメントを入力して下さい')
      } else {
        axios.post(`/api/articles/${articleId}/comments`, {
          comment: {content: content}
        })
          .then((res) => {
            const comment = res.data
            appendNewComment(comment)
            $('#comment_content').val('')
          })
      }
    })
})

// like func
document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId

    axios.get(`/api/articles/${articleId}/like`)
        .then((response) => {
            const hasLiked = response.data.hasLiked
            handleHeartDisplay(hasLiked)
        })

    listenInactiveHeartEvent(articleId)
    listenActiveHeartEvent(articleId)
})

