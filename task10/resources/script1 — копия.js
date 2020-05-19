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

let defaultPosts = [
    {
        id: '1',
        description: 'aaa',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Ivan',
        hashTags: ['covid-19'],
        likes: ['Ivan']
    },
    {
        id: '2',
        description: 'bbb',
        createdAt: new Date('2020-03-21T12:58:00'),
        author: 'anna',
        photoLink: 'https://images.aif.ru/017/670/9a6e8711e058b9c97bcbe0ef1061c82c.jpg',
        hashTags: ['burger'],
        likes: []
    }
];


class Model {
    data ;
    number;

    constructor() {
        let keyPosts = Object.keys(localStorage);
        this.data = [];
        if (keyPosts.length === 0) {
            data=defaultPosts;
            for (var i = 0; i < defaultPosts.length; i++) {
                this.add(defaultPosts[i]);
            }
        } else {
            for (let i = 0; i < keyPosts.length; i++) {
                try {
                    let post = JSON.parse(localStorage.getItem(keyPosts[i]));

                    post.createdAt = new Date(post.createdAt);

                    this.data.push(post);
                } catch (e) {
                    console.log('Parse JSON error');
                }
            }
        }
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
            this.number=responseData.length;
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
    saveToLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(this));
    }

    static restoreFromLocalStorage() {
        return new Model(JSON.parse(localStorage.getItem('posts')).data);
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

    add(post={}) {
      //  post.createdAt = new Date();
        post.likes = [];
        if (Model.validate(post)) {

            this.data.push(post);
            this.data.sort(Model.comparator_BY_DATE);
            let o=JSON.stringify(post);
            localStorage.setItem(post.id, o);
            return true;
        }
        return false;
    }

    edit(id, tweet) {
        for (let param in tweet) {
           /* if (param === 'id' || param === 'author' || param === 'createdAt' || param === 'likes') {
                console.log("You can't change id, author, createdAt, likes");
                return false;
            }*/
        }

        if (!Model.validate(tweet, Object.keys(tweet))) {
            return false;
        }

        let editingTweet = this.get(id);

        for (let param in tweet) {
            editingTweet[param] = tweet[param];
        }
        localStorage.removeItem(id);
        localStorage.setItem(id, JSON.stringify(editingTweet));
        return true;
    }

    remove(id) {
        if (typeof id === 'string') {
            let index = this.data.findIndex(post => post.id === id);

            if (index !== -1) {
                this.data.splice(index, 1);
                localStorage.removeItem(id);
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
            localStorage.removeItem(id);
            localStorage.setItem(id, JSON.stringify(post));
            return true;
        }

        return false;
    }
    dislike(id = '', user = '') {
        let post = this.get(id);
        let index = post.likes.findIndex(like => like === user);
        if (index !== -1) {
            post.likes.splice(index,1);
            localStorage.removeItem(id);
            localStorage.setItem(id, JSON.stringify(post));
            return true;
        }

        return false;
    }
}


class View {
    mainPage;
    logPage;
    postTemplate;
    postContainer;
    currentUser;
    filterForm;
    filterName;
    filterTag;
    filterDateFrom;
    filterDateTo;
    applyFilter;
    addInW;
    plusInW;
    plusInPosts;
    addPostButton;
    postPage;
    postText;
    postTags;
    postTextStart;
    postTagsStart;
    whatsInputTags;
    action;
    edit;
    like;
    userInputName;
    userInputPassword;
    whatsInput;
    ok;
    logInB;
    withoutLog;
    userName;
    logForm;
    logOutForV;
    tweet;

    constructor() {
        this.mainPage= document.getElementById('mainPage');
        this.userInputName=document.getElementById('userInputName');
        this.userInputPassword=document.getElementById('userPassword');
        this.userName=document.getElementById('userName');
        this.logPage= document.getElementById('logPage');
        this.logOutForV=document.getElementById('logOutForV');
        this.postTemplate = document.getElementById('tweetTemplate');
        this.postContainer = document.getElementById('tweetContainer');
     //   this.currentUser = 'Valery';
        this.filterForm=document.getElementById('filterForm');
        this.filterName=document.getElementById('fname');
        this.filterTag=document.getElementById('filterTag');
        this.filterDateFrom=document.getElementById('Data1');
        this.filterDateTo=document.getElementById('Data2');
        this.applyFilter=document.getElementById('app');
        this.addInW=document.getElementById('addInW');
      //  this.tweet=document.getElementById('oneTweet');
        this.plusInW=document.getElementById('plusInW');
        this.plusInPosts=document.getElementById('plusInPosts');
        this.postPage=document.getElementById('tweet');
        this.postText=document.getElementById('text');
        this.postTags=document.getElementById('tagsInput');
        this.postTextStart=document.getElementById('tweetText');
        this.postTagsStart=document.getElementById('tags');
        this.withoutLog=document.getElementById('logOut');
        this.logForm=document.getElementById('logForm');
        this.logInB=document.getElementById('logIn');
        this.whatsInput=document.getElementById('whatsInput');
        this.whatsInputTags=document.getElementById('whatsInputTags');
       // this.action=document.getElementById('action');
       this.edit=document.querySelector('button.Edit');
        this.like=document.querySelector('button.like');
        this.ok=document.querySelectorAll('button.Ok');

    }

    setPostView(postView = {}, post = {}) {

        postView.firstElementChild.id = post.id;
        if(this.currentUser===post.author){
            postView.getElementById("edit").setAttribute('style', 'display: block');
            postView.getElementById("like").setAttribute('style', 'display: none');
        }
        let index = post.likes.findIndex(like => like === this.currentUser);
        if (index !== -1) {
            postView.getElementById("like").setAttribute('style', 'background-color: #000000');
        }

        postView.querySelector('p.tweet-text').textContent = post.description;
        postView.querySelector('p.tags').textContent = '#' + post.hashTags.join(' #');
        postView.querySelector('h3.tweet-name').textContent = post.author + ' | ' + post.createdAt.toLocaleString();


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
        document.getElementById(id)?.querySelector('div.tweet-action').lastElementChild.setAttribute('style', 'background-color: #000000');
    }

    dislikePost(id = '') {
        document.getElementById(id)?.querySelector('div.tweet-action').lastElementChild.setAttribute('style', 'background-color: transparent');
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
class Controller {
    static view;
    static model;
    static curUser;
    static curNumVisiblePosts;
    static curFilter;
    static curPost;
    static users;


    constructor() {
        Controller.model = new Model();
        Controller.view = new View();


        Controller.view.withoutLog.addEventListener('click', Controller.logOut);
        Controller.view.logInB.addEventListener('click', Controller.logIn);
        Controller.view.applyFilter.addEventListener('click', Controller.filter);
        Controller.view.logForm.addEventListener('click', Controller.logBForm);
        Controller.view.plusInPosts.addEventListener('click', Controller.seeMore);
        Controller.view.addInW.addEventListener('click', Controller.donePost);
        Controller.view.logOutForV.addEventListener('click', Controller.logOutForV);
        Controller.view.postContainer.addEventListener('click', Controller.postAction);

        Controller.curUser = document.getElementById('userName').textContent;
        Controller.curNumVisiblePosts = 10;
        Controller.curFilter = {};
        Controller.curPost = null;
        Controller.users = new Map();
        Controller.users.set('nikmalevich', '1111');
        Controller.users.set('anna', '2222');
        Controller.getPage(0, Controller.curNumVisiblePosts);
    }

    static getPage(skip = 0, top = 10, filters = {}) {
        Controller.view.clearView();

        Controller.model.getPage(skip, top, filters).forEach(post => Controller.view.showTweet(post));
        if (top <= Controller.model.number) {
            Controller.view.plusInPosts.setAttribute('style', 'display: block');
        } else {
            Controller.view.plusInPosts.setAttribute('style', 'display: none');
        }
        if (Controller.model.number <= Controller.curNumVisiblePosts) {
            // Controller.view.plusInPosts.setAttribute('style', 'display: block');
            //  Controller.view.plusInPosts.setAttribute('style', 'display: none');
        } else {
            //Controller.view.plusInPosts.setAttribute('style', 'display: block');
        }
    }

    static logBForm(){
        Controller.curUser = Controller.view.userInputName.value;
        Controller.view.currentUser = Controller.curUser;
        Controller.view.mainPage.getElementsByClassName('user')[0].innerHTML = Controller.curUser.toString();
        Controller.view.withoutLog.setAttribute('style', 'display: none');
        Controller.view.logOutForV.setAttribute('style', 'display: block');
        Controller.view.logPage.setAttribute('style', 'display: none');
        Controller.view.mainPage.setAttribute('style', 'display: block');
    }
    static logOutForV() {
        Controller.curUser ='';
        Controller.view.currentUser ='';

        Controller.view.mainPage.getElementsByClassName('user')[0].innerHTML = 'You are not logged';
        Controller.view.withoutLog.setAttribute('style', 'display: none');
        Controller.view.logInB.setAttribute('style', 'display: block');
        Controller.view.logOutForV.setAttribute('style', 'display: none');
        Controller.view.logPage.setAttribute('style', 'display: none');
        Controller.view.mainPage.setAttribute('style', 'display: block');
        Controller.getPage(0, 5, Controller.curFilter);
    }

    static logOut() {
        Controller.view.mainPage.getElementsByClassName('user')[0].innerHTML = 'You are not logged';
        Controller.view.withoutLog.setAttribute('style', 'display: none');
        Controller.view.logInB.setAttribute('style', 'display: block');
        Controller.view.logPage.setAttribute('style', 'display: none');
        Controller.view.mainPage.setAttribute('style', 'display: block');

    }

    static logIn() {
        Controller.view.withoutLog.setAttribute('style', 'display: block');
        Controller.view.logInB.setAttribute('style', 'display: none');
        Controller.view.logPage.setAttribute('style', 'display: block');
        Controller.view.mainPage.setAttribute('style', 'display: none');
    }



    static filter() {
        //let formElements = event.currentTarget.elements;
        let Chek;
        let name = Controller.view.filterName.value;
        let hashTags = Controller.view.filterTag.value;
        let dateFrom = Controller.view.filterDateFrom.value;
        let dateTo = Controller.view.filterDateTo.value;

        Controller.curFilter = {};

        if (name !== '') {
            Controller.curFilter.author = name;
        }

        if (hashTags !== '') {
            Controller.curFilter.hashTags = hashTags.split(' ');
        }
        if (dateFrom !== '') {
            Controller.curFilter.dateFrom = new Date(dateFrom);
        }
        if (dateTo !== '') {
            Controller.curFilter.dateTo = new Date(dateTo);
        }

        Controller.getPage(0, 5, Controller.curFilter);
    }

    static postAction(event) {
        let chek;
        let id = event.target.parentElement.parentElement.id;
        let reez = event.target.className;
        switch (reez) {
            case 'like':
                //let id = event.target.parentElement.parentElement.id;
                //let reez= event.target.className;
                let styl=event.target.style.backgroundColor;
                if(styl === "rgb(0, 0, 0)"){
                    Controller.view.dislikePost(id);
                    Controller.model.dislike(id, Controller.curUser);}
               else {Controller.view.likePost(id);
                    Controller.model.like(id,Controller.curUser)}
              //  if(event.target.parentElement.parentElement.getElementsByClassName('like')[0].style.backgroundColor === '#000000')  Controller.view.dislikePost(id);

                break;
            case 'Edit':
                //let id = event.target.parentElement.parentElement.id;
                //let reez= event.target.className;
                event.target.parentElement.parentElement.getElementsByClassName('Edit')[0].setAttribute('style', 'display:none ');
                event.target.parentElement.parentElement.getElementsByClassName('Ok')[0].setAttribute('style', 'display:block ');
                let parentElement = event.target.parentElement.parentElement;
                //event.target.parentElement.parentElement.setAttribute('style', 'display: none');
                let childElement = event.target.parentElement.parentElement.getElementsByClassName('tweet-text')[0];
                childElement.setAttribute('style', 'display: none');
                event.target.parentElement.parentElement.getElementsByClassName('tags')[0].setAttribute('style', 'display: none');
                event.target.parentElement.parentElement.getElementsByClassName('tweet-input-text')[0].setAttribute('style', 'display:inline ');
                event.target.parentElement.parentElement.getElementsByClassName('tweet-input-text')[0].value= event.target.parentElement.parentElement.getElementsByClassName('tweet-text')[0].innerHTML;
                event.target.parentElement.parentElement.getElementsByClassName('tags-input')[0].setAttribute('style', 'display: inline');
                event.target.parentElement.parentElement.getElementsByClassName('tags-input')[0].value= event.target.parentElement.parentElement.getElementsByClassName('tags')[0].innerHTML;
                // Controller.view.editOk.setAttribute('style', 'display: block');
                break;
            case 'Ok':
                Controller.curPost = Controller.model.get(id);
                Controller.curPost.hashTags = [];
                Controller.curPost.description = event.target.parentElement.parentElement.getElementsByClassName('tweet-input-text')[0].value;
                Controller.curPost.hashTags = event.target.parentElement.parentElement.getElementsByClassName('tags-input')[0].value.split(' ');
                let post = {
                    description: Controller.curPost.description,
                    hashTags: Controller.curPost.hashTags
                };

                if (Controller.curPost === null) {
                    post.id = Controller.curNumVisiblePosts.toString();
                    post.createdAt = new Date(Date.now());
                    post.author = Controller.curUser;
                    post.likes = [];
                    if (Controller.curNumVisiblePosts < 10) {
                        this.curNumVisiblePosts++;
                    }


                }

                event.target.parentElement.parentElement.getElementsByClassName('tweet-input-text')[0].setAttribute('style', 'display: none');
                event.target.parentElement.parentElement.getElementsByClassName('tags-input')[0].setAttribute('style', 'display: none');
                Controller.curPost.createdAt = new Date(Date.now());


                Controller.model.edit(id, Controller.curPost);
                Controller.view.editPost(id, Controller.curPost);
                event.target.parentElement.parentElement.getElementsByClassName('tweet-text')[0].setAttribute('style', 'display: block');
                event.target.parentElement.parentElement.getElementsByClassName('tags')[0].setAttribute('style', 'display: block');
                // Controller.view.editOk.setAttribute('style', 'display: none');
                Controller.getPage(0, 7, Controller.curFilter);

                break;
        }
    }

    static seeMore() {
        Controller.curNumVisiblePosts += 10;

        Controller.getPage(0, Controller.curNumVisiblePosts, Controller.curFilter);
    }

    static addPost(event) {
        Controller.curPost = null;
        // Controller.view.whatsInput.setAttribute('style', 'display: inline')
        //   Controller.view.addInW.setAttribute('style', 'display: none')

        event.preventDefault();
    }

    static donePost() {

        let description = Controller.view.whatsInput.value;
        let hashTags = [];
        hashTags = Controller.view.whatsInputTags.value.split(' ');

        if (description === '' || description.length > 200) {
            //Controller.view.incorrectPostData.setAttribute('style', 'visibility: visible');
            Controller.view.whatsInput.value = "";
            Controller.view.whatsInputTags.value = "";
            Controller.view.whatsInput.setAttribute('placeholder', 'Incorrect Try More');
            Controller.view.whatsInputTags.setAttribute('placeholder', 'Incorrect Try More');
            return;
        }


        let post = {
            description: description,
            hashTags: hashTags
        };

        Controller.curNumVisiblePosts++;
        post.id = Controller.curNumVisiblePosts.toString();
        post.createdAt = new Date(Date.now());
        post.author = Controller.curUser;
        post.likes = [];
        if (Controller.curNumVisiblePosts < 10) {
            this.curNumVisiblePosts++;
        }
        Controller.model.add(post);


        Controller.view.whatsInput.value = "";
        Controller.view.whatsInputTags.value = "";
        //Controller.view.whatsInput.setAttribute('style', 'display: none');
        Controller.getPage(0, 6, Controller.curFilter);

    }
}

window.onload = () => {
    localStorage.clear();
    new Controller();
};

////////////////////////////////////////////////lexa
