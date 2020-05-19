package models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Post {

    private String id;
    private   String description;
    private  Date createdAt;
    private String author;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;

    public String getId() {
        return id;
    }
    public Post(String id, String description, Date createdAt, String author,
                String photoLink, List<String> hashTags, List<String> likes) {
        this.id = id;
        this.description = description;
        this.createdAt = (Date)createdAt.clone();
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = new ArrayList<>(hashTags);
        this.likes = new ArrayList<>(likes);
    }


    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Post)) return false;
        Post post = (Post) o;
        return id == post.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}