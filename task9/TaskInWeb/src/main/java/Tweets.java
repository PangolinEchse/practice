import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.Post;
import models.Posts;

import javax.annotation.PostConstruct;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;
@WebServlet(name = "Tweets", urlPatterns = "/servlet")
public class Tweets extends HttpServlet {
    Posts Posts= new Posts();
    private void getPost(String id, HttpServletResponse resp) throws IOException {
        Post post = Posts.get(id);
        resp.getWriter().print((new Gson()).toJson(post));
    }



   protected void filtr(HttpServletRequest req, HttpServletResponse resp) throws IOException {


       if (req.getRequestURI().equals("/tweets/search")){
           int skip= Integer.parseInt(Optional.ofNullable((req.getParameter("skip"))).orElse("0"));
           int top= Integer.parseInt(Optional.ofNullable((req.getParameter("top"))).orElse("10"));
           resp.getWriter().write((new Gson()).toJson(Posts.getPage(skip,top)));
       }

   }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        List<String> uriList = Arrays.asList(req.getRequestURI().split("/"));
        try {
            switch (uriList.get(2)) {
                case ("id"):
                    getPost(uriList.get(3), resp);
                    break;
                case ("search"):
                    filtr(req, resp);
                    break;
                default:
                    resp.sendRedirect("/");
            }
        } catch (IndexOutOfBoundsException e) {
            String id = req.getParameter("id");
            if (id != null) {
                getPost(id, resp);
            } else {
                req.getRequestDispatcher("/").forward(req, resp);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String post = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        boolean postAdded = Posts.add(post);
        resp.getWriter().print(postAdded ? "true" : "false");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        List<String> uriList = Arrays.asList(req.getRequestURI().split("/"));
        String id = null;

        if (uriList.size() > 3 && uriList.get(3).equals("id")) {
            id = uriList.get(3);
        } else if (req.getParameter("id") != null) {
            id = req.getParameter("id");
        }

        resp.getWriter().print(Posts.remove(id));
    }
    protected void getPage(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().print((new GsonBuilder()).setPrettyPrinting().create().toJson(Posts.getPage(0,10)));
    }

}