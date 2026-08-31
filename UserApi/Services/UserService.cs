using Microsoft.EntityFrameworkCore;
using UserApi.Data;
using UserApi.Models;
using UserApi.DTOs;

using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace UserApi.Services;

public class UserService(AppDbContext db) : IUserService
{
    private readonly AppDbContext _db = db;

    public async Task<List<User>> GetUsersAsync()
    {
        return await _db.Users.ToListAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User> CreateAsync(CreateUserDto dto)
    {
        var user = new User
        {
            Name = dto.Name,
            Age = dto.Age,
            Title = dto.Title
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return user;
    }

    public async Task<User?> UpdateAsync(int id, UpdateUserDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return null;
        }

        user.Name = dto.Name;
        user.Age = dto.Age;
        user.Title = dto.Title;

        await _db.SaveChangesAsync();

        return user;
    }

    public async Task<bool> DeleteAsync(int id) 
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null) 
        {
            return false;
        }

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();

        return true;
    }
}