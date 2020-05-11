import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import com.google.gson.Gson;

public class CheckServlet extends HttpServlet {

    boolean success;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        CheckServlet s=new CheckServlet();
        s.success = true;

        Gson gson = new Gson();
        resp.getWriter().print(gson.toJson(s));
    }

}
