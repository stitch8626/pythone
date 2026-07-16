class Person: 
    def __init__(self, name):
        self.__name = name 


    @property
    def name(self):
        return self.__name
    
    def display_info(self):
        print(f"Имя {self.name}")
    

class Summary_bank(Person):

   def user_name(self):
       print(f"клиент с именем {self.name}")


class Student(Person):

    def study(self):
        print(f"имя студента {self.name}")



def display_info(person):
    if isinstance(person, Student):
        person.study()
    elif isinstance(person, Summary_bank):
        person.user_name()
    elif isinstance(person, Person):
        person.display_info()


yarik = Summary_bank("Yarik")

tom = Student("Tom")

sam = Person("Sam")

display_info(tom)
display_info(yarik)
display_info(sam)

ilon = Person("ilon")
ilon.display_info()