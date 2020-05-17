document.addEventListener('DOMContentLoaded', () => {
    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    if (localStorage.getItem('user') == null)
    {
        window.location = INDEX_PAGE + '/login'; 
    }
    else
    {
        window.location = INDEX_PAGE + '/chat_rooms';
    }

});