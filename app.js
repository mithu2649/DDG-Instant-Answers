let answer_container = document.querySelector('#answer_container');

let search_btn = document.querySelector('#search')
    .addEventListener('click', function (e) {

        e.preventDefault();
        let query = document.querySelector('#query').value;

        if (query == "") {
            answer_container.innerHTML = 'Please type in your query';
            return console.error('Please type in your query');
        }
        if (query.charAt(0) == '!') bangRedirect(query);

        getAnswer(query)
            .then((res) => res.json())
            .then((answer) => {

                console.log(answer);

                let title = document.createElement('h1');
                    title.innerHTML = answer.Heading;

                let abstract = document.createElement('div');
                    abstract.innerHTML = answer.Abstract;

                let link = document.createElement('a');
                    link.innerHTML = `${answer.AbstractURL.substr(0, 40)+'...'}`;
                    link.setAttribute('href', answer.AbstractURL);

                answer_container.innerHTML = '';
                answer_container.appendChild(title);
                answer_container.appendChild(abstract);
                answer_container.appendChild(link);

                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            })
            .catch((err) => console.error('Something went wrong!', err));

        
    });

async function getAnswer(query) {
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    let proxy2 = `https://crossorigin.me/`;

    let url = `https://api.duckduckgo.com/?q=${query}&format=json`;
    return (response = await fetch(proxy + url));
}

function bangRedirect(query) {
    let redirectURL = `https://api.duckduckgo.com/?q=${query}&format=json`;
    window.location.href = redirectURL;

    console.warn('Please wait. You\'re being redirected...');
    return;
}
