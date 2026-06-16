class Person:
    def __init__(self, name, age):
        self.__name = name    # устанавливаем имя
        self.__age = age       # устанавливаем возраст
 
    # сеттер для установки возраста
    def set_age(self, age):
        if 0 < age < 110:
            self.__age = age
        else:
            print("Недопустимый возраст")
 
    # геттер для получения возраста
    def get_age(self):
        return self.__age
 
    # геттер для получения имени
    def get_name(self):
        return self.__name
     
    def print_person(self):
        print(f"Имя: {self.__name}\nВозраст: {self.__age}")
          
  
tom = Person("Tom", 39)
tom.print_person()  # Имя: Tom  Возраст: 39
tom.set_age(-3486)  # Недопустимый возраст
tom.set_age(25)
tom.print_person()  # Имя: Tom  Возраст: 25