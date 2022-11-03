function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    loadPosts();
    
    async function loadPosts() {
        const selectIdElm = document.getElementById('posts');

        await fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(response => response.ok === true ? response.json() : 'Error')
            .then(data => {
                const items = Object.values(data).map(item => {
                    const option = document.createElement('option');
                    option.setAttribute('value', item.id);
                    option.textContent = item.title;

                    return option;
                });
                selectIdElm.replaceChildren(...items);
                return data;
            }).catch(error => console.log(error));

        document.getElementById('btnViewPost').addEventListener('click', getPostInfo);
        getPostInfo();
    }

    async function getPostInfo() {
        const postId = document.getElementById('posts').value;
        const postComments = [];

        await fetch('http://localhost:3030/jsonstore/blog/comments/')
            .then(response => response.ok === true ? response.json() : 'Error')
            .then(data => {

                for (const item of Object.values(data)) {
                    if (item.postId === postId) {
                        postComments.push(item);
                    }
                }

                if (postComments.length === 0) {
                    throw new Error(`Element with Id: ${postId} can not be found!`);
                }
            })
            .catch(error => console.log(error));

        let post = '';

        await fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`)
            .then(response => response.ok === true ? response.json() : 'Error')
            .then(data => post = data)
            .catch();

        const postTitleElm = document.getElementById('post-title');
        postTitleElm.textContent = post.title;

        const postBodyelm = document.getElementById('post-body');
        postBodyelm.textContent = post.body;

        const commentsUl = document.getElementById('post-comments');

        let postLiItems = postComments.map(item => {
            const li = document.createElement('li');
            li.id = item.id;
            li.textContent = item.text;

            return li;
        });

        commentsUl.replaceChildren(...postLiItems);
    }
}

attachEvents();