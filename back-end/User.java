import java.sql.*;

public class User {

    private String username;
    private String password;

    public User(String username, String password)
    {
        this.username = username;
        this.password = password;
    }

    /* Setters & Getters */
    void setUsername(String username)
    {
        this.username = username;
    }

    String getUsername()
    {
        return this.username;
    }

    void setPassword(String password)
    {
        this.password = password;
    }

    String getPassword()
    {
        return this.password;
    }
}