import {displayAllCommentsForPost} from './comments.js';

document.querySelector('form').addEventListener('submit', createPost);
document.querySelector('button.cancel').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('form').reset();
});

//Creating post from the form data
async function createPost(event) {
    try {
        const postData = getSubmitData(event);

        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });

        if (response.ok === false) {
            throw new Error('Unable to send post! Server Error!');
        }
        const result = await response.json();

        // sessionStorage.setItem('postId', result._id);
        // sessionStorage.setItem('username', result.username);

        await displayAllPosts()
    } catch (error) {
        alert(error.message);
        
    } finally {
        event.target.reset();
    }
}

// Getting the data from the post form
function getSubmitData(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { topicName, username, postText } = Object.fromEntries(formData);

    if (topicName === '') {
        throw new Error('Title field is mandatory!');
    }
    if (username === '') {
        throw new Error('Username field is mandatory!');
    }
    if (postText === '') {
        throw new Error('Post should have a text!');
    }
    event.target.reset();

    return {
        topicName,
        username,
        postText,
        postedOn: new Date().toISOString()
    }
}

async function retrieveAllPosts() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = await response.json();

    return data;
}

// Calls retrieveAllPosts to get the data and visualise it
export async function displayAllPosts() {
    try {
        const data = await retrieveAllPosts();

        const fragment = new DocumentFragment();
        const posts = Object.values(data).map(createPostCard)

        for (const post of posts) {
            fragment.appendChild(post);
        }

        const topicContainer = document.querySelector('div.topic-container');
        topicContainer.replaceChildren(fragment);

    } catch (error) {
        alert(error.message);
    }
}

// Called by 'displayAllPosts' to create all post elements prior display
function createPostCard(post) {
    const warpperDiv = document.createElement('div');
    warpperDiv.classList.add('topic-name-wrapper');
    warpperDiv.setAttribute('postId', post._id);

    const topicNameDiv = document.createElement('div');
    topicNameDiv.classList.add('topic-name');

    const titleAnchor = document.createElement('a');
    titleAnchor.setAttribute('href', '#');
    titleAnchor.classList.add('normal');
    titleAnchor.addEventListener('click', showPostView);

    const titleH2 = document.createElement('h2');
    titleH2.textContent = post.topicName;

    const columnsDiv = document.createElement('div');
    columnsDiv.classList.add('columns');

    const insideColumnsDiv = document.createElement('div');

    const dateP = document.createElement('p');
    dateP.textContent = 'Date: ';

    const time = document.createElement('time');
    time.textContent = post.postedOn;

    const nickName = document.createElement('div');
    nickName.classList.add('nick-name');

    const usernameP = document.createElement('p');
    usernameP.textContent = 'Username: ';

    const userNameSpan = document.createElement('span');
    userNameSpan.textContent = post.username;

    warpperDiv.appendChild(topicNameDiv);

    topicNameDiv.appendChild(titleAnchor);

    titleAnchor.appendChild(titleH2);

    topicNameDiv.appendChild(columnsDiv);

    columnsDiv.appendChild(insideColumnsDiv);

    insideColumnsDiv.appendChild(dateP);

    dateP.appendChild(time);

    insideColumnsDiv.appendChild(nickName);

    nickName.appendChild(usernameP);

    usernameP.appendChild(userNameSpan);

    return warpperDiv;
}

// Called when clicking on post item
async function showPostView(event) {
    const postId = this.parentElement.parentElement.getAttribute('postId');
    const data = await getPost(postId);
    sessionStorage.setItem('postId', postId);

    document.querySelector('main').style.display = 'none';

    const themeContent = createPostView(data);
    
    document.querySelector('div.container').appendChild(themeContent);
    await displayAllCommentsForPost();// calling comments function after the elements of the post are created

}

function createPostView(post) {
    // Creating theme-content div
    const divThemeContent = document.createElement('div');
    divThemeContent.classList.add('theme-content');

    const divThemeTitle = document.createElement('div');
    divThemeTitle.classList.add('theme-title');

    const divThemeNameWrapper = document.createElement('div');
    divThemeNameWrapper.classList.add('theme-name-wrapper');

    const divThemeName = document.createElement('div');
    divThemeName.classList.add('theme-name');

    const h2PostTitle = document.createElement('h2');
    h2PostTitle.textContent = post.topicName;

    // Append theme content
    divThemeContent.appendChild(divThemeTitle);
    divThemeTitle.appendChild(divThemeNameWrapper);
    divThemeNameWrapper.appendChild(divThemeName);
    divThemeName.appendChild(h2PostTitle);

    // Creating post inside the theme content html
    // ----------------------------------------------
    // Creating div > 'comment'
    const divComment = document.createElement('div');
    divComment.classList.add('comment');
    divComment.setAttribute('post-id', post._id);

    const commentInnerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>${post.postedOn}</time></p>

        <p class="post-content">${post.postText}</p>
    </div>`;

    divComment.innerHTML = commentInnerHTML;
    
    // Appending div - 'comment' to theme-content div
    divThemeContent.appendChild(divComment);
    // -----------------------------------------------


    // Creating 'answer-comment' div
    const divAnswerComment = document.createElement('div');
    divAnswerComment.classList.add('answer-comment');

    const pAnswerComment = document.createElement('p');

    const spanAnswerComment = document.createElement('span');
    spanAnswerComment.textContent = 'currentUser';

    pAnswerComment.textContent = ' comment:';

    pAnswerComment.appendChild(spanAnswerComment);

    const divAnswer = document.createElement('div');
    divAnswer.classList.add('answer');

    const formElm = document.createElement('form');

    const textArea = document.createElement('textarea');
    textArea.setAttribute('name', 'postText');
    textArea.setAttribute('id', 'comment');
    textArea.setAttribute('cols', '30');
    textArea.setAttribute('rows', '10');

    const emptyFormDiv = document.createElement('div');

    const label = document.createElement('label');
    label.setAttribute('for', 'username');
    label.textContent = 'Username';

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('red');
    labelSpan.textContent = '*';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'username');
    input.setAttribute('id', 'username');

    const postBtn = document.createElement('button')
    postBtn.textContent = 'Post';

    // Appending children to 'answer-comment' div
    divAnswerComment.appendChild(pAnswerComment);
    pAnswerComment.prepend(spanAnswerComment);
    divAnswerComment.appendChild(divAnswer);
    divAnswer.appendChild(formElm);
    formElm.appendChild(textArea);
    formElm.appendChild(emptyFormDiv);
    emptyFormDiv.appendChild(label);
    emptyFormDiv.appendChild(input);
    formElm.appendChild(postBtn);

    divThemeContent.appendChild(divAnswerComment);

    return divThemeContent;
}
// Called by showPostView
async function getPost(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
    const data = await response.json();
    return data;
}

async function createPostInPostView() {
    const post = getPost();
}

