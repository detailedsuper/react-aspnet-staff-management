using Microsoft.EntityFrameworkCore;
using UserApi.Data;
using UserApi.Models;
using UserApi.DTOs;

namespace UserApi.Services;

public class UserService : IUserService
{
    private readonly List<User> _users = new()
    {
        new User(1, "Alice", 25),
        new User(2, "Bob", 17),
        new User(3, "Charlie", 32)
    };

    public List<User> GetUsers()
    {
        return _users;
    }

    public User? GetUserById(int id)
    {
        return _users.FirstOrDefault(u => u.Id == id);
    }

    public User Create(CreateUserDto dto)
    {
        var user = new User(
            _users.Count + 1,
            dto.Name,
            dto.Age
        );

        _users.Add(user);
        return user;
    }

    public User? Update(int id, UpdateUserDto dto)
    {
        var user = _users.FirstOrDefault(u => u.Id == id);

        if (user == null)
        {
            return null;
        }

        user.Name = dto.Name;
        user.Age = dto.Age;

        return user;
    }

    public bool Delete(int id) 
    {
        var user = _users.FirstOrDefault(u => u.Id == id);

        if (user == null) 
        {
            return false;
        }

        _users.Remove(user);

        return true;
    }
}