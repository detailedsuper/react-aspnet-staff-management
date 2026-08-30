namespace UserApi.DTOs;

public record UpdateUserDto(
    string Name,
    int Age,
    string? Title
);
