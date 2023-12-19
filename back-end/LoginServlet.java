import javax.servlet.*;
import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HTTPServlet{
    private ConexionBD conexion;

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doPost(HTTPServletRequest request, HTTPServletResponse response) throws ServletException, IOException{
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User user = conexion.checkUser(username, password);

        if(user != null)
        {
            request.getSession().setAttribute("user", user);
            response.sendRedirect("perfil.jsp");
        }
        else {
            request.setAttribute("errorMessage", "Invalid username or password");
            request.getRequestDispatcher("login.html").forward(request, response);
        }
    }
}
