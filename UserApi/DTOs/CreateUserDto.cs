namespace UserApi.DTOs;

public record CreateUserDto(
    string Name,
    int Age,
    string? Title
);
