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