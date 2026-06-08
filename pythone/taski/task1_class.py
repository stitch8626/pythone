# Определите класс Rectangle, который представляет прямоугольник.
# Через конструктор класс принимает ширину и длину и сохраняет их в атрибутах width и length соответственно.
# Также этом классе определите метод area, который возвращает площадь прямоугольника, и метод perimeter,
# который возвращает периметра прямоугольника.

# После создания класса определите несколько объектов класса Rectangle и продемонстрируйте работу его методов.


class Rectangle:
    def __init__(self, width, lengh):
        self.widht = width
        self.lengh = lengh
        print(f"Прямоугольник имеет длину {width} и длину {lengh}")

    def area(self):
        print(f"площадь прямоугольника: {self.widht * self.lengh}")

    def perimeter(self):
        print(f"периметра прямоугольника: ", 2 * (self.widht + self.lengh) )



rect = Rectangle(40,40)
rect.area()
rect.perimeter()

print("\n")

rect2 = Rectangle(90,70)
rect2.area()
rect2.perimeter()