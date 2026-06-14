class Person:
    def __init__(self, name, age):
        self.__name = name    # устанавливаем имя
        self.__age = age       # устанавливаем возраст
                  
    def print_person(self):
        print(f"Имя: {self.__name}\tВозраст: {self.__age}")
          
  
tom = Person("Tom", 39)
tom.__name = "Человек-паук"     # пытаемся изменить атрибут __name
tom.__age = -129                # пытаемся изменить атрибут __
tom.print_person()       