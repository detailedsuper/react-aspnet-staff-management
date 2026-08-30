using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using UserApi.DTOs;
using UserApi.Services;

namespace UserApi.Controllers;

[ApiController]
[Route("users")]
public class UsersController : ControllerBase
{
   private readonly IUserService _userService;

   public UsersController(IUserService userService)
   {
      _userService = userService;
   }

   [HttpGet]
   public async Task<IActionResult> GetUsers()
   {
      var users = await _userService.GetUsersAsync();

      return Ok(users);
   }

   [HttpGet("{id}")]
   public async Task<IActionResult> GetUserById(int id)
   {
      var user = await _userService.GetUserByIdAsync(id);

      if (user == null) 
      {
         return NotFound();
      }

      return Ok(user);
   }

   [HttpPost]
   public async Task<IActionResult> Create(CreateUserDto dto)
   {
      var user = await _userService.CreateAsync(dto);

      return Created($"/users/{user.Id}", user);
   }

   [HttpPut("{id}")]
   public async Task<IActionResult> Update(int id, UpdateUserDto dto)
   {
      var user = await _userService.UpdateAsync(id, dto);

      if (user == null)
      {
         return NotFound();
      }

      return Ok(user);
   }

   [HttpDelete("{id}")]
   public async Task<IActionResult> Delete(int id)
   {
      var deleted = await _userService.DeleteAsync(id);

      return Ok(deleted);
   }

}