package models;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class Posts {
    private static List<Post> posts;

    public Posts() {
        posts = new ArrayList<>();

        List<String> hashTags = new ArrayList<>();
        hashTags.add("helloworld");
        hashTags.add("123");

        List<String> likes = new ArrayList<>();
        likes.add("Like1");
        likes.add("Like2");

        this.add(new Post("1", "First test 1", new Date(), "jvugiug lguuhoih", "www.photo",
                hashTags, likes));

        this.add(new Post("2", "Second test 2", new Date(), "yfy,yfyfiuy", "www.photo.link",
                hashTags, likes));
    }

    public static boolean validate(Post post) {
        return post.getId() != null && post.getId().length() >= 1 &&
                post.getDescription() != null && post.getDescription().length() < 250 &&
                post.getCreatedAt() != null &&
                post.getAuthor() != null && post.getAuthor().length() >= 1;
    }

    public static Post get(String id) {
        for(Post post: posts) {
            if(post.getId().equals(id)) {
                return post;
            }
        }

        return null;
    }
    public static Stream<Post> stream() {
        return posts.stream();
    }

    public static boolean add(String jsonPost) {
        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .create();
        Post newPost;

        try {
            newPost = gson.fromJson(jsonPost, Post.class);
            if (newPost == null || newPost.getDescription() == null || newPost.getAuthor() == null) {
                return false;
            }
        } catch (JsonSyntaxException e) {
            return false;
        }

        newPost.setId( String.valueOf(posts.size() + 1));
        newPost.setCreatedAt(new Date());

        posts.add(newPost);
        return true;
    }

    public boolean add(Post post) {
        if(validate(post)) {
            posts.add(post);

            return true;
        }

        return false;
    }

    public static boolean remove(String id) {
        for(Post post: posts) {
            if(post.getId().equals(id)) {
                posts.remove(post);

                return true;
            }
        }

        return false;
    }

    public boolean edit(String id, Post post) {
        if (validate(post)) {


            Post editingPost = this.get(id);


            editingPost.setDescription(post.getDescription());

            editingPost.setPhotoLink(post.getPhotoLink());

            editingPost.setHashTags(post.getHashTags());


            return true;
        } else return false;
    }

    public List<Post> getAll() {
        return posts;
    }

    public List<Post> getPage(int a, int b) {
        int n;
        if(a+b<posts.size())  n=a+b;
        else n=posts.size();
        List<Post> page = new ArrayList<>();
        for(int i=a;i<=n;i++){
            page.add(posts.get(i));
        }

        return page;
    }

    public void clear() {
        posts.clear();
    }
}
