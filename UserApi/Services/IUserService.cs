using UserApi.Models;
using UserApi.DTOs;

namespace UserApi.Services;

public interface IUserService
{
    List<User> GetUsers();

    User?  GetUserById(int id);

    User Create(CreateUserDto dto);

    User? Update(int it, UpdateUserDto dto);
    
    bool Delete(int id);
}