using System;
using Application.Interfaces;
using Domain.User;

namespace Infrastructure;

public class UserRepo : IUserRepo
{
    private readonly DatabaseContext _context;

    public UserRepo(DatabaseContext context)
    {
        _context = context;
    }

    public User GetUserByUsername(string username)
    {
        return _context.Users.FirstOrDefault(u => u.Username == username);
    }

    public void Register(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }
}
