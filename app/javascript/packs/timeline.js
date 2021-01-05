import $ from 'jquery'
import axios from 'modules/axios'

// comment def
const handleCommentForm = () => {
    $('.show_comment_form').on('click', () => {
      $('.show_comment_form').addClass('hidden')
      $('.comment_text_area').removeClass('hidden')
    })
  }

  const appendNewComment = (comment) => {
      $('.comments-container').append(
        `<div><img class="comments_image"src="${(comment.user.comment_avatar_image)}"></img></div>
        <div class="comments_name"><p>${(comment.user.account_name)}</p></div>
        <div class="comments_content"><p>${(comment.content)}</p></div>`
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
    
        $('.inactive-heart').on('click', function() {
            const likeId = $(this).attr('id')
            axios.post(`/api/articles/${likeId}/like`)
            .then((response) => {
                if (response.data.status === 'ok') {
                    $(`#${likeId}.active-heart`).removeClass('hidden')
                    $(`#${likeId}.inactive-heart`).addClass('hidden')
                }
            }) 
            // .catch((e) => {
            //     window.alert('Error')
            //     console.log(e)
            // })
        })
    
        $('.active-heart').on('click', function(){
            const likeId = $(this).attr('id')
            axios.delete(`/api/articles/${likeId}/like`)
                .then((response) => {
                    if (response.data.status === 'ok') {
                        $(`#${likeId}.active-heart`).addClass('hidden')
                        $(`#${likeId}.inactive-heart`).removeClass('hidden')
                    }
                }) 
                // .catch((e) => {
                //     window.alert('Error')
                //     console.log(e)
                // })
        })
})


