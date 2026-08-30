using UserApi.Models;
using UserApi.DTOs;

namespace UserApi.Services;

public interface IUserService
{
    Task<List<User>> GetUsersAsync();

    Task<User?>  GetUserByIdAsync(int id);

    Task<User> CreateAsync(CreateUserDto dto);

    Task<User?> UpdateAsync(int it, UpdateUserDto dto);
    
    Task<bool> DeleteAsync(int id);
}