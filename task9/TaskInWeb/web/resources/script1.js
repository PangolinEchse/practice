let data = ([
    {
        id: '1',
        description: 'test1',
        createdAt: new Date(),
        author: 'test1',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'tag1', 'tag2', 'tag3'
        ],
        likes: [
            'user1', 'user2', 'user3'
        ]
    },
    {
        id: '2',
        description: 'test2',
        createdAt: new Date(),
        author: 'test2',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'tag1', 'tag2', 'tag3'
        ],
        likes: [
            'user1', 'user2', 'user3'
        ]
    },
    {
        id: '3',
        description: 'test3',
        createdAt: new Date(),
        author: 'test3',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'tag1', 'tag2', 'tag3'
        ],
        likes: [
            'user1', 'user2', 'user3'
        ]
    },
    {
        id: '4',
        description: 'test4',
        createdAt: new Date(),
        author: 'test4',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'tag1', 'tag2', 'tag3'
        ],
        likes: [
            'user1', 'user2', 'user3'
        ]
    },
    {
        id: '5',
        description: 'test5',
        createdAt: new Date(),
        author: 'test5',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'tag1', 'tag2', 'tag3'
        ],
        likes: [
            'user1', 'user2', 'user3'
        ]
    },

]);

class Model {
    data = [];

    constructor(tweets) {
        this.data = tweets;
    }

    getPage(skip, top, filterConfig) {
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log('Incorrect input!');
            return;
        }

        skip = skip || 0;
        top = top || 10;
        this.filterConfig = filterConfig;


        if (filterConfig) {
            let responseData = this.data;

            for (let param in filterConfig) {
                if (param === 'hashTags') {
                    for (let i = 0; i < filterConfig.hashTags.length; i++) {
                        responseData = responseData.filter(post => post.hashTags.includes(filterConfig.hashTags[i]));
                    }
                } else if (param === 'dateFrom') {
                    responseData = responseData.filter(post => post.createdAt >= filterConfig.dateFrom);
                } else if (param === 'dateTo') {
                    responseData = responseData.filter(post => post.createdAt < filterConfig.dateTo);
                } else if (param === 'author') {
                    responseData = responseData.filter(post => post.author === filterConfig.author);
                }
            }

            responseData.sort(Model.comparator_BY_DATE);
            return responseData.slice(skip, skip + top);
        } else {
            let responseData = this.data.slice(skip, skip + top);

            responseData.sort(Model.comparator_BY_DATE);

            return responseData;
        }
    }

    static comparator_BY_DATE(a, b) {
        return b.createdAt - a.createdAt;
    }

    get(id) {
        if (typeof id === 'string') {
            return this.data.find(post => post.id === id);
        } else {
            console.log('Incorrect type of id.');
        }
    }

    static validate(post, params = ['id', 'description', 'author', 'createdAt', 'photoLink', 'hashTags', 'likes']) {
        return params.every(function (param) {
            switch (param) {
                case 'id':
                    if (!post.id || typeof post.id !== 'string') {
                        return false;
                    }
                    break;
                case 'description':
                    if (!post.description || typeof post.description !== 'string' || post.description.length > 250) {
                        return false;
                    }
                    break;
                case 'author':
                    if (!post.author || typeof post.author !== 'string') {
                        return false;
                    }
                    break;
                case 'createdAt':
                    if (!post.createdAt || Object.prototype.toString.call(post.createdAt) !== '[object Date]') {
                        return false;
                    }
                    break;
                case 'photoLink':
                    if (post.photoLink && typeof post.photoLink !== 'string') {
                        return false;
                    }
                    break;
                case 'hashTags':
                    if (post.hashTags) {
                        if (!post.hashTags.every(tag => typeof tag === 'string')) {
                            return false;
                        }
                    }
                    break;
                case 'likes':
                    if (post.likes.length !== 0) {
                        if (!post.likes.every(like => typeof like === 'string')) {
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
            }
            return true;
        });
    }

    add(post) {
        post.createdAt = new Date();
        post.likes = [];
        if (Model.validate(post)) {

            this.data.push(post);
            this.data.sort(Model.comparator_BY_DATE);
            return true;
        }
        return false;
    }

    edit(id, tweet) {
        for (let param in tweet) {
            if (param === 'id' || param === 'author' || param === 'createdAt' || param === 'likes') {
                console.log("You can't change id, author, createdAt, likes");
                return false;
            }
        }

        if (!Model.validate(post, Object.keys(post))) {
            return false;
        }

        let editingTweet = this.get(id);

        for (let param in tweet) {
            editingTweet[param] = tweet[param];
        }

        return true;
    }

    remove(id) {
        if (typeof id === 'string') {
            let index = this.data.findIndex(post => post.id === id);

            if (index !== -1) {
                this.data.splice(index, 1);

                return true;
            }
        }
        return false;
    }


    like(id = '', user = '') {
        let post = this.get(id);
        let index = post.likes.findIndex(like => like === user);
        if (index === -1) {
            post.likes.push(user);

            return true;
        }

        return false;
    }
}


class View {
    postTemplate;
    postContainer;
    currentUser;

    constructor() {
        this.postTemplate = document.getElementById('postTemplate');
        this.postContainer = document.getElementById('postContainer');
        this.currentUser = 'User';
    }

    setPostView(postView = {}, post = {}) {

        postView.firstElementChild.id = post.id;
        postView.querySelector('p.post-text').textContent = post.description;
        postView.querySelector('p.tags').textContent = '#' + post.hashTags.join(' #');
        postView.querySelector('h3.post-name').textContent = post.author + ' | ' + post.createdAt.toLocaleString();


    }

    showTweet(post = {}) {
        let postView = document.importNode(this.postTemplate.content, true);

        this.setPostView(postView, post);

        this.postContainer.insertBefore(postView, this.postContainer.firstElementChild);
    }

    editPost(id = '', post = {}) {
        let postView = document.importNode(this.postTemplate.content, true);

        this.setPostView(postView, post);

        document.getElementById(id)?.replaceWith(postView);
    }

    removePost(id = '') {
        document.getElementById(id)?.remove();
    }

    likePost(id = '') {
        document.getElementById(id)?.querySelector('div.post-action').lastElementChild.setAttribute('style', 'background-color: #000000');
    }

    dislikePost(id = '') {
        document.getElementById(id)?.querySelector('div.post-action').lastElementChild.setAttribute('style', 'background-color: transparent');
    }

    clearView() {
        let first = this.postContainer.firstElementChild;

        while (first !== this.postContainer.lastElementChild) {
            first.remove();

            first = this.postContainer.firstElementChild;
        }
    }


}

let model;
let view;


function addPost(post = {}) {
    if (model.add(post)) {
        view.showTweet(post);
    }
}

function editPost(id = '', post = {}) {
    if (model.edit(id, post)) {
        view.editPost(id, model.get(id));
    }
}

function removePost(id = '') {
    if (model.remove(id)) {
        view.removePost(id);
    }
}


function getPage(skip = 0, top = 10, filters = {}) {

    view.clearView();
    model.getPage(skip, top, filters).reverse().forEach(post => view.showTweet(post));
}

window.onload = () => {
    model = new Model(data);
    view = new View();

    getPage(0, 10)


};

function likePost(id = '', user = '') {
    if (model.like(id, user)) {
        view.likePost(id);
    } else {
        view.dislikePost(id);
    }
}