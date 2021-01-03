import $ from 'jquery'
import axios from 'modules/axios'

document.addEventListener('DOMContentLoaded', function() {
    const reader = new FileReader();
    const imageUpload = document.getElementById("file")
        $('#profile_avatar_prev').on('click', function() {
          $('#file').trigger('click')
        })
        $('#file').on('change', () => {
          $('#file-btn').trigger('click')
        })
        
        imageUpload.onchange = function() {
          var file = $('input[type="file"]').prop('files')[0];
          
      if(!file) {
        window.alert('画像を選択してください')
      } else {
        reader.readAsDataURL(file);
        reader.onload = function(e){
          $('#profile_avatar_prev').attr('src', e.target.result);
          axios.put('/profile', {profile: {avatar: e.target.result}})
          .then((res) => {
              window.alert('成功!')
          })
          .catch((e) => {
            window.alert('失敗!')
          })
        }
      }
    }
  })

  document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#account-show').data()
    const accountId = dataset.accountId

    // axios.get(`/accounts/${accountId}/follows/id`)
    //     .then((response) => {
    //         const hasFollowed = response.data.hasFollowed
    //         if (hasFollowed) {
    //             $('.unfollow').removeClass('hidden')
    //         } else {
    //             $('.follow').removeClass('hidden')
    //         } 
    //     })

        $('.follow').on('click', () => {
            axios.post(`/accounts/${accountId}/follows`)
            .then((response) => {
                if (response.data.status === 'ok') {
                    $('.unfollow').removeClass('hidden')
                    $('.follow').addClass('hidden')
                //   $('.profile-num2').text(`${response.data.followCount}`)
                }
            })
            .catch((e) => {
                window.alert('Error')
                console.log(e)
            })
        })

        $('.unfollow').on('click', () => {
            axios.post(`/accounts/${accountId}/unfollows`)
            .then((response) => {
                if (response.data.status === 'ok') {
                $('.follow').removeClass('hidden')
                $('.unfollow').addClass('hidden')
                //   $('.profile-num2').text(`${response.data.followCount}`)
                }
            })
            .catch((e) => {
            window.alert('Error')
            console.log(e)
            })
        })
    })