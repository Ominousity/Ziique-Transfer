using System;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Application.Helpers;

public class JWTSettings(IConfiguration configuration)
{
    public string Key { get; } = configuration["JwtSettings:Key"];
}
