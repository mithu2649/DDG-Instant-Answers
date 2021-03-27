let answer_container = document.querySelector('#answer_container');
let message_container = document.querySelector('#message');
let message = document.querySelector('#message span');

let search_btn = document.querySelector('#search')
    .addEventListener('click', function (e) {

        e.preventDefault();
        let query = document.querySelector('#query').value;

        if (query == "") {
            showMessage('Please type in your query!', 'failed')
        }

        if (query.charAt(0) == '!') return bangRedirect(query);

        getAnswer(query)
            .then((res) => res.json())
            .then((answer) => {

                if (answer.Abstract == '' && answer.Heading == '') {
                    showMessage('No results found. Try something else...', 'warning', 4000);
                    return;
                }

                let title = document.createElement('h1');
                title.innerHTML = answer.Heading;

                let abstract = document.createElement('div');
                abstract.innerHTML = answer.Abstract;

                let link = document.createElement('a');
                link.innerHTML = `${answer.AbstractURL.substr(0, 40) + '...'}`;
                link.setAttribute('href', answer.AbstractURL);

                answer_container.innerHTML = '';
                answer_container.appendChild(title);
                answer_container.appendChild(abstract);
                answer_container.appendChild(link);

                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });

                hideMessage();
            })
            .catch((err) => {
                // console.error('Something went wrong!', err);
                showMessage('Something went wrong!', 'failed');
            });

        showMessage('Please wait while I\'m looking for it...');
    });

async function getAnswer(query) {
    let proxy1 = `https://cors-anywhere.herokuapp.com/`;
    let proxy2 = `https://crossorigin.me/`;

    let url = `https://api.duckduckgo.com/?q=${query}&format=json`;
    return (response = await fetch(proxy + url));
}

function bangRedirect(query) {
    let redirectURL = `https://api.duckduckgo.com/?q=${query}&format=json`;
    window.location.href = redirectURL;
    showMessage('Please wait. You\'re being redirected...', 'warning');
    return;
}


function showMessage(msg, status = 'success', time = 3000) {
    message_container.style.top = '20px';

    if (status == 'failed') {
        message_container.style.backgroundColor = '#ce515d';
    } else if (status == 'warning') {
        message_container.style.backgroundColor = '#cf813a';
    } else {
        message_container.style.backgroundColor = '#178867';
    }

    message.innerHTML = msg;
    setTimeout(function () {
        hideMessage();
    }, time);
}
function hideMessage() {
    message_container.style.top = '-100px';
}
