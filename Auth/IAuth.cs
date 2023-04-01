using ExpenseTracker.Models;

namespace ExpenseTracker.Auth
{
    public interface IAuth
    {

            Task<int> Register(User user, string password);
            Task<string> Login(string email, string password);
            Task<bool> UserExists(string email);
    }
}
