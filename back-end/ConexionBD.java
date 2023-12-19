/**********************************
 * Fichero para acceder a la BBDD *
 *********************************/

import java.sql.*;

public class ConexionBD {

    private ConexionBD Unique_Instance = null;
    private Connection conexion = null;

    private static final String CONEXION_BD_NAME = "jbdc:nysql://localhost/tfg";

    public static ConexionBD getInstance(){
        if(Unique_Instance == null)
        {
            try{
                Unique_Instance = new ConexionBD();
            } 
            catch (SQLException e){
                System.err.println("Error al crear la instancia de la clase Conexión a BD");
                e.printStackTrace();
            }
        }

        return Unique_Instance;
    }

    private ConexionBD() throws Exception
    {
        abrirConexion();
    }

    private void abrirConexion()
    {
        if(conexion == null)
        {
            try{
                Class.forName("com.mysql.cj.jdbc.Driver");
                conexion = DriverManager.getConnection(CONEXION_BD_NAME, "root", "");
            }
            catch(Exception e){
                System.out.println("No se ha podido conectar a la Base de Datos");
                e.printStackTrace();
            }
        }
    }

    public boolean checkUser(String user, String password)
    {
        abrirConexion();

        ResultSet results = null;

        try{
            Statement statement = conexion.createStatement();
            String query = "SELECT * FROM usuarios WHERE username='" + user + "' AND password='" + password + "'";
            results = statement.executeQuery(query);

            if(results.next()){
                return true;
            }
            else{
                return false;
            }
        }
        catch(Exception e){
            System.out.println("Ocurrió un error en el método checkUser");
            e.printStackTrace();
            return false;
        }
    }
    
}