$(document).ready(() => {
    $('#signin').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                window.location.href = "/dashboard";
            }
            else{
                alert(data.message)
            }
        }, 'json');

        return false;
    });
});