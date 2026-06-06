class Person:
    def __init__(self,name,age):
        self.__name = name
        self.__age = age


    def set_age(self, age):
        if 0 < age < 110:
            self._age = age 







    def print_person(self):
       print(f"Имя: {self.__name}\nВозраст: {self.__age}")


Yaroslav = Person("Yaroslav попросил залить на гит", 16)
Yaroslav._Person__name = "Spider man"
Yaroslav.print_person()