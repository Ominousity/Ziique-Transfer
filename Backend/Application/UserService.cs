using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Helpers;
using Application.Interfaces;
using Domain.User;
using Isopoh.Cryptography.Argon2;
using Microsoft.IdentityModel.Tokens;

namespace Application;

public class UserService : IUserService
{
    private readonly IUserRepo _userRepo;
    private readonly string _jwtKey;

    public UserService(IUserRepo userRepo, JWTSettings jwtKey)
    {
        _userRepo = userRepo;
        _jwtKey = jwtKey.Key;
    }

    public User GetUserByUsername(string username)
    {
        return _userRepo.GetUserByUsername(username);
    }

    public string Login(string username, string password)
    {
        username = Encoding.UTF8.GetString(Convert.FromBase64String(username));
        password = Encoding.UTF8.GetString(Convert.FromBase64String(password));

        var user = _userRepo.GetUserByUsername(username);
        if (user == null || !VerifyArgon2Hash(password, user.Password))
        {
            throw new UnauthorizedAccessException("Invalid username or password");
        }

        var token = GenerateJwtToken(user);
        return token;
    }

    public void Register(string username, string password)
    {
        username = Encoding.UTF8.GetString(Convert.FromBase64String(username));
        password = Encoding.UTF8.GetString(Convert.FromBase64String(password));

        var hashedPassword = HashPasswordWithArgon2(password);
        _userRepo.Register(new User
        {
            Username = username,
            Password = hashedPassword
        });
    }
    
    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.Name, user.Username)
            ]),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        Console.WriteLine(token);

        return tokenHandler.WriteToken(token);
    }

    private string HashPasswordWithArgon2(string password)
    {
        var hashedPassword = Argon2.Hash(password);
        return hashedPassword;
    }

    private bool VerifyArgon2Hash(string password, string hash)
    {
        if (Argon2.Verify(hash, password))
        {
            return true;
        }
        return false;
    }
}
