class Person:
    def __init__(self, name, age):
        self.__name = name 
        self.__age = age

    
    
    
    @property
    def age(self):
        return self.__age
    
    @age.setter
    def age(self, age):
        if 0 < age < 110:
            self.__age = age
        else:
            print("Недопустимый возраст")

    @property
    def name(self):
        return self.__name

    def print_person(self):
        print(f"Имя: {self.__name}\tВозраст: {self.__age}")



tom = Person("Tom", 67)
tom.print_person()