using System;
using Domain.User;

namespace Application.Interfaces;

public interface IUserRepo
{
    User GetUserByUsername(string username);
    void Register(User user);
}
