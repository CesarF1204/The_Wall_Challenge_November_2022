$(document).ready(() => {

    /* post */
    $('#post').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {

            if(data.status){
                $("#post_data").append(`<li>${data.result.post} - Posted by: ${data.result.posted_by} - Posted at: ${data.result.posted_at}
                                            <form action="/delete_post_process" class="delete_post" method="post">
                                                <input type="hidden" name="post_id" value="${data.result.id}">
                                                <input type="submit" value="Delete Post">
                                            </form>
                                            <a href="/edit_post/${data.result.id}">Edit Post</a>
                                            <ul></ul>
                                        </li>
                                        <form action="/comment_process" id="comment" method="post">
                                            <input type="hidden" name="post_id" value=${data.result.id}>
                                            <input type="text" name="comment" id="comment">

                                            <input type="submit" value="Comment">
                                        </form>
                                        `);
                $(".post").val('');
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

    $('.delete_post').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {

            if(data.status){
                alert("Post deleted!");
                location.reload()
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

    /* edit post */
    $('.edited_post').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                window.location.href = '/dashboard';
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

});