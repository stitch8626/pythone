const PI = Math.PI;

// Площадь: S = π * r²
export function getArea(radius) {
    return PI * radius ** 2;
}

// Длина окружности: C = 2 * π * r
export function getCircumference(radius) {
    return 2 * PI * radius;
}