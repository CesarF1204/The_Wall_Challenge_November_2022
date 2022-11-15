$(document).ready(() => {

    /* comment */
    $('.comment').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {

            if(data.status){
                $(`#comment_data_${data.result.post_id}`).append(`<li>${data.result.comment} - Commented by: ${data.result.commented_by} - Commented at: ${data.result.commented_at}</li>
                                                                    <form action="/delete_comment_process" class="delete_comment" method="post">
                                                                        <input type="hidden" name="comment_id" value="<%= comments[comment].comment_id %>">
                                                                        <input type="submit" value="Delete Comment">
                                                                    </form>
                                                                    <a href="/edit_comment/<%= comments[comment].comment_id %>">Edit Comment</a>
                                                                `);
                $(".comment-input").val('');
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

    /* delete comment */
    $('.delete_comment').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                alert("Comment deleted!");
                location.reload();
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

    /* edit comment */
    $('.edited_comment').on('submit', function() {
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