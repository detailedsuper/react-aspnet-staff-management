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
   public IActionResult GetUsers() //? same names intendedly?
   {
      var users = _userService.GetUsers();

      return Ok(users);
   }

   [HttpGet("{id}")]
   public IActionResult GetUserById(int id)
   {
      var user = _userService.GetUserById(id);

      if (user == null) 
      {
         return NotFound();
      }

      return Ok(user);
   }

   [HttpPost]
   public IActionResult Create(CreateUserDto dto)
   {
      var user = _userService.Create(dto);

      return Created($"/users/{user.Id}", user); //?
   }

   [HttpPut("{id}")]
   public IActionResult Update(int id, UpdateUserDto dto)
   {
      var user = _userService.Update(id, dto);

      if (user == null)
      {
         return NotFound();
      }

      return Ok(user);
   }

   [HttpDelete("{id}")]
   public IActionResult Delete(int id)
   {
      var deleted = _userService.Delete(id);

      if (!deleted) 
      {
         return NotFound();
      }

      return NoContent();
   }

}