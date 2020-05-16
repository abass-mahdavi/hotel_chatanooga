document.addEventListener('DOMContentLoaded', () => {
    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    user = JSON.parse(localStorage.getItem('user'));
    if (user){
        window.location = INDEX_PAGE + '/chat_rooms';
    }
    else{
        window.location = INDEX_PAGE + '/login';
    }

});
