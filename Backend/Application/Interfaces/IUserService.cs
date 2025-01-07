using System;
using Domain.User;

namespace Application.Interfaces;

public interface IUserService
{
    string Login(string username, string password);
    void Register(string username, string password);
    User GetUserByUsername(string username);
}
