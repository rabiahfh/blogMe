// var myCropWidget = cloudinary.createUploadWidget({
//     cloudName: 'demo', uploadPreset: 'preset1', folder: 'widgetUpload', cropping: true}, 
//     (error, result) => { console.log(error, result) })

// document.getElementById("upload_widget_opener").addEventListener("click", function() {
//     // cloudinary.openUploadWidget({ cloud_name: 'demo', upload_preset: 'a5vxnzbp'}, 
//       function(error, result) { console.log(error, result) });
//   }, false);

 
  
  // row.append("<p>On " + new Date(data[i].created_at).toLocaleDateString() + "</p>"); for Date.

  $(document).ready(function(){

    $("#add-post-btn").on("click",handleBlogPostSubmit);
    $("#userpostdiv").on("click", handlePostDelete);
    $("#userpostdiv").on("click", handlePostEdit);
    $("#userpostdiv").on("click", handlePostEditSave);
     
    let currentUserId = parseInt($("#blog-info").attr("data-id"))
    function getUserPosts(id){
      $.get(`/api/userposts/${id}`).then (res =>
        {
          let userpostdiv = $("#userpostdiv");
          let postHtml = ""; 
          let postArray = res;
          
          if(postArray.length === 0){
            userpostdiv.html("<h3>No post yet!!</h3>");
          }
          else {
            for(let i=0; i< postArray.length; i++){
              let date = new Date((postArray[i].createdAt).substring(0,10)).toDateString();
              
                postHtml+=`<div class="post-preview">
                <h2 class="post-title">${postArray[i].title}</h2>
                <h3 class="post-subtitle">${postArray[i].body}</h3>
                <p class="post-meta">Posted on ${date}</p>
                <button data-id=${postArray[i].id} class="delete-btn">delete post</button>
                <button data-id=${postArray[i].id} class="edit-btn">Edit post</button>
            </div>
            <hr>`
            }
            userpostdiv.html(postHtml);
          }
        });
    }

      getUserPosts(currentUserId);

       function handleBlogPostSubmit(event){
        event.preventDefault();
        let newPost = {
          title: $("#post-title").val().trim(),
          body: $("#message").val().trim(),
          UserId: parseInt($("#blog-info").attr("data-id"))
        }
      console.log(newPost);
      $.post("/api/posts", newPost, function (res){
        location.reload()
        console.log(res);
      })
       }

       function handlePostEdit(event) { 
        if(!event.target.matches(".edit-btn")){
          return;
        }
        let title = ($(event.target).siblings("h2").text());
        let postBody = ($(event.target).siblings("h3").text());
        var currentPost = $(event.target).attr("data-id")
        console.log(currentPost);
        console.log(this);
        $(this).html(`<div class="form-group">
        <input value=${title} class="form-control mb-2" id="post-title-edit" type= "text" placeholder="Post-title">
        <label class="sr-only" for="message">post</label>
        <textarea class="form-control" id="message-edit" rows="3" placeholder="What are you thinking?">${postBody}</textarea>
      </div> 
      <button type="submit" class="btn btn-primary" id="save-edit-btn" data-id=${currentPost}>Save Edit</button>`)
    
      }

      function handlePostEditSave(event){
        if(!event.target.matches("#save-edit-btn")){
          return;
        }
        var currentPostId = $(event.target).attr("data-id")
        var title = $("#post-title-edit").val().trim();
        var body = $("#message-edit").val().trim();
        editPost(currentPostId, title,body)
      }
  
      function editPost(id,title,postBody) {

        let editedPost = {
        
          title: title,
          body: postBody,
          postId: id
        }
      
        $.ajax({
          method: "PUT",
          data: editedPost,
          url: "/api/posts/" 
        })
          .then(function() {
            // getPosts(postCategorySelect.val());
            location.reload();
          });
      }   

    
    function handlePostDelete(event) { 
      if(!event.target.matches(".delete-btn")){
        return;
      }

      var currentPost = $(event.target).attr("data-id")
      console.log(currentPost);
  
      deletePost(currentPost);
    }

    function deletePost(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id
      })
        .then(function() {
          // getPosts(postCategorySelect.val());
          location.reload();
        });
    }
    
  
      });    
