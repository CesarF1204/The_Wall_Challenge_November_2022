$(document).ready(() => {
    $('#register').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                alert('Successfully Registered!')
                window.location.href = "/signin";
            }
            else{
                alert(data.message)
            }
        }, 'json');

        return false;
    });
});