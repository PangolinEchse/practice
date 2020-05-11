class PostList {
    posts = [];

    constructor(posts) {
        this.posts = posts.concat();
    }

    getPage(skip , top , filterConfig) {
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log('Incorrect input!');
            return;
        }
        
        skip = skip || 0;
        top = top || 10;
        this.filterConfig = filterConfig;


        if (filterConfig){
            let returningPosts = this.posts;

            for (let param in filterConfig){
                 if (param === 'hashTags'){
                    for (let i = 0; i < filterConfig.hashTags.length; i++){
                        returningPosts = returningPosts.filter(post => post.hashTags.includes(filterConfig.hashTags[i]));
                    }
                }
                else if (param === 'dateFrom'){
                    returningPosts = returningPosts.filter(post => post.createdAt >= filterConfig.dateFrom);
                }
                else if (param === 'dateTo'){
                    returningPosts = returningPosts.filter(post => post.createdAt < filterConfig.dateTo);
                }
                else if (param === 'author'){
                    returningPosts = returningPosts.filter(post => post.author === filterConfig.author);
                }
            }

            returningPosts.sort(PostList.comparator_BY_DATE);

            return returningPosts.slice(skip, skip + top);
        }
        else {
            let returningPosts = this.posts.slice(skip, skip + top);

            returningPosts.sort(PostList.comparator_BY_DATE);

            return returningPosts;
        }
    }

    static comparator_BY_DATE(a, b) {
       return b.createdAt - a.createdAt;
    }

     get(id) {
        if (typeof id === 'string'){
            return this.posts.find(post => post.id === id);
        }
        else {
            console.log('Incorrect type of id.');
        }
    }

        static validate(post, params = ['id', 'description', 'author', 'createdAt', 'photoLink','hashTags','likes']) {
        return params.every(function (param) {
            switch (param) {
                case 'id':
                    if (!post.id || typeof post.id !== 'string'){
                        return false;
                    }
                    break;
                case 'description':
                    if (!post.description || typeof post.description !== 'string' || post.description.length > 250){
                        return false;
                    }
                    break;
                case 'author':
                    if (!post.author || typeof post.author !== 'string'){
                        return false;
                    }
                    break;
                case 'createdAt':
                    if (!post.createdAt || Object.prototype.toString.call(post.createdAt) !== '[object Date]'){
                        return false;
                    }
                    break;
                case 'photoLink':
                    if (post.photoLink && typeof post.photoLink !== 'string'){
                        return false;
                    }
                    break;
                case 'hashTags':
                    if (post.hashTags){
                        if (!post.hashTags.every(tag => typeof tag === 'string')){
                            return false;
                        }
                    }
                    break;
                case 'likes':
                    if (post.likes.length !==0){
                        if (!post.likes.every(like => typeof like === 'string')){
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

     add(post){
        post.createdAt=new Date();
        postt.likes=[];
        if (PostList.validate(post)){
            this.posts.push(post);
            this.posts.sort(PostList.comparator_BY_DATE);
            return true;
        }
        return false;
    }

     edit(id, post){
        for (let param in post){
            if (param === 'id' || param === 'author' || param === 'createdAt'|| param === 'likes'){
                console.log("You can't change id, author, createdAt, likes");
                return false;
            }
        }

        if(!PostList.validate(post, Object.keys(post))){
            return false;
        }

        let editingPost = this.get(id);

        for (let param in post){
            editingPost[param] = post[param];
        }

        return true;
    }

    remove(id){
        if (typeof id === 'string'){
            let index = this.posts.findIndex(post => post.id === id);

            if (index !== -1){
                this.posts.splice(index, 1);

                return true;
            }
        }
        return false;
    }

        addAll(posts) {
        let invalidPosts = [];

        posts.forEach(post => {
            if (PostList.validate(post)){
                this.add(post);
            }else{
             invalidPosts.push(post)
         }
        });

        return invalidPosts;
    }

}


let tweets = new PostList([
    {
        id: '1',
        description: 'test1.',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Borovik Christina',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '2',
        description: 'test2',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test2',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '3',
        description: 'test3',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test3',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '4',
        description: 'test4',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test4',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '5',
        description: 'test5',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test5',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
            likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '6',
        description: 'test6',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test6',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '7',
        description: 'test7',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test7',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '8',
        description: 'test8',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test8',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '9',
        description: 'test9',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test9',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '10',
        description: 'test10',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test10',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '11',
        description: 'test11',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test11',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '12',
        description: 'test12',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test12',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '13',
        description: 'test13',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test13',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '14',
        description: 'test14',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test14',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '15',
        description: 'test15',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test15',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag1','tag2','tag3'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '16',
        description: 'test16',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test16',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag13','tag23','tag33'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '17',
        description: 'test17',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test17',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag13','tag23','tag33'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '18',
        description: 'test18',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test18',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag13','tag23','tag33'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '19',
        description: 'test19',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test19',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag12','tag22','tag32'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
    {
        id: '20',
        description: 'test20',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test10',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
         hashTags: [
                'tag12','tag22','tag32'
            ],
        likes: [
                'user1','user2','user3'
            ]
    },
]);



  
    //Testing
    console.log("Top 2 posts, skip 1 posts, hashTags: tag23,tag33):");
    console.log(tweets.getPage(1,2, {hashTags: ['tag1','tag2']}));

    console.log("Top 10 posts:");
    console.log(tweets.getPage(0,10));

    console.log("Top 10 posts, skip 5");
    console.log(tweets.getPage(5,10));

    console.log("Top 1 post, skip 0 posts, author test10:");
    console.log(tweets.getPage(0,1, {author: 'test10'}));


    console.log("Get posts with incorrect input:");
    console.log(tweets.getPage('10',2));

    console.log("Get post with id 1:");
    console.log(tweets.get('1'));

    console.log("Get post with id 1000:");
    console.log(tweets.get('1000'));

    console.log("Get post with wrong input:");
    console.log(tweets.get(25));

    console.log("Validating post 1:");
    console.log(PostList.validate(post=tweets.get('1'),post.keys));

    console.log("Add new post with correct parameters:");
    tweets.add({id: "21", createdAt: new Date(), description: "test description", author: "test21"});
    console.log(tweets.get('21'));

    console.log("Edit new post:");
    tweets.edit('21',{description: "edit", photoLink: "https://pbs.twimg.com/profile_images/969572403876651008/V2D7jwaf_400x400.jpg"});
    console.log(tweets.get('21'));

    console.log("Edit unchangeable parameters:");
    tweets.edit('21',{id: '22', description: "edit", photoLink: "https://pbs.twimg.com/profile_images/969572403876651008/V2D7jwaf_400x400.jpg"});

    console.log("Delete new post:");
    tweets.remove('21');
    console.log(tweets.get('21'));

    console.log("Add new posts:");
    let invalid = tweets.addAll([
    {
        id: '22',
        description: 'addAll1',
        createdAt: new Date(),
        author: 'test22',
       
    },
    {
        id: '23',
        description: 'invalid1',
    },
    {
        id: 24,
        description: 'invalid2',
    }
    ]);

    console.log("new  post:");
    console.log(tweets.get('22'));

    console.log("Invalid posts:");
    console.log(invalid);
    