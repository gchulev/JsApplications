

async function getCommentsForPost() {
    //const postId = document.querySelector('.comment').getAttribute('post-id');
    const postId = sessionStorage.getItem('postId');
    const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const allComments = await response.json();

    const filteredComments = Object.values(allComments).filter(x => x.postId === postId);
    return filteredComments;
}

export async function displayAllCommentsForPost() {
    const currentPostComments = await getCommentsForPost();
    const postElm = document.querySelector('.comment');

    const fragment = new DocumentFragment();
    const commentElements = Object.values(currentPostComments).map(createCommentStructure);

    for (const htmlItem of commentElements.values()) {
        const userCommentElm = document.createElement('div');
        userCommentElm.classList.add('user-comment');

        userCommentElm.innerHTML = htmlItem;
        fragment.appendChild(userCommentElm);
    }

    postElm.append(fragment);
    //Attaching event listener to the comments form
    document.querySelectorAll('form')[1].addEventListener('submit', createComment);

}

function createCommentStructure(comment) {
    const commentHTML = `<div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${comment.username}</strong> commented on <time>${comment.commentedOn}</time></p>
                <div class="post-content">
                    <p>${comment.postText}</p>
                </div>
            </div>
        </div>`;

    return commentHTML;
}

async function createComment(e) {
    e.preventDefault();
    const data = collectFormData(e.target);
    const currentPost = sessionStorage.getItem('postId');
    data.postId = currentPost;
    data.commentedOn = new Date().toISOString()

    const rsponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-Type': 'applicatoin/json' },
        body: JSON.stringify(data)
    });

    await displayAllCommentsForPost();
}

function collectFormData(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        if (data.postText === '') {
            throw new Error('Post content can not be empty!');
        }
        if (data.username === '') {
            throw new Error('Fill in username!');
        }
        form.reset();
        return data;

    } catch (error) {
        alert(error.message);
        throw error;
    }
}