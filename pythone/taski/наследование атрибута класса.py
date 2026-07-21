class Person: 
    def __init__(self, name):
        self.__name = name 


    @property
    def name(self):
        return self.__name
    
    def display_info(self):
        print(f"Имя {self.name}")
    

class Summary_bank(Person):

    def __init__(self,name, summary):
        super().__init__(name)
        self.__summary = summary
    

    @property
    def summary(self):
        return self.__summary
    

    def dislpay_info(self):
        super().display_info()
        print(f"Сумма: {self.__summary}")




tom = Summary_bank("Tom", 67)
tom.dislpay_info()