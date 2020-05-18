document.addEventListener('DOMContentLoaded', () => {
    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    if (localStorage.getItem('user') == null)
    {
        window.location = INDEX_PAGE + '/login'; 
    }
    else
    {
        const current_room = JSON.parse(localStorage.getItem('user'))['current_room'];
        if (current_room == "")
        {
            window.location = INDEX_PAGE + '/chat_rooms';
        }
        else
        {
            window.location = INDEX_PAGE + '/chat_room/' + current_room;
        }

    }

});


/*

const current_room = JSON.parse(localStorage.getItem('user')['current_room'];
if (current_room == "")
    window.location = INDEX_PAGE + '/chat_rooms';
else
    window.location = INDEX_PAGE + '/chat_room/' + current_room;

*/