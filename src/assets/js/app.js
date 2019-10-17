/*
 * Fonction permettant de réaliser la demande de validation HTML
 */
function validateHtml(){
    let pathnameSplit = location.pathname.split('/');
    let controller = pathnameSplit[1];
    let action = pathnameSplit[2];

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/validator/?controller=' + controller + '&action=' + action);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.location.reload();
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };

    xhr.send();
}