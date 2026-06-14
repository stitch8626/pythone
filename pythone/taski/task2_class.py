# Упражнение 2
# Создайте класс BankAccount, который представляет банковский счет. 
# Определите в этом классе атрибуты account_number и balance, которые представляют номер счета и баланс. 
# Через параметры конструктора передайте этим атрибутам начальные значения.

# Также в классе определите метод add, который принимает некоторую сумму и добавляет ее на баланс счета. 
# И определите метод withdraw, который принимает некоторую сумму и снимает ее с баланса. При этом с баланса нельзя снять больше, чем имеется. 
# Если на балансе недостаточно средств, то пользователю должно выводиться соответствующее сообщение.

class BankAccount:
    def __init__(self, balance= 0,account_number=1 ):
        self.balance = balance
        self.account_number = account_number
        print(f"у акаунта {account_number} баланс: {balance}")

    def add(self, summary_add=0):
        self.summary_add = summary_add
        print(f"к балансу {self.balance} прибавляем {summary_add} теперь баланс: ", end="")
        self.balance = self.balance + summary_add
        print(f"{self.balance}")

    def withdraw(self, remove_balanse):
        self.remove_balanse = remove_balanse
        if remove_balanse > self.balance:
            print("На балансе не достаточно средст")
        else: 
            print(f"С баланса {self.balance} списанны средства в виде {remove_balanse}")
            self.balance = self.balance - remove_balanse
            print(f"ваш баланс состовляет: {self.balance}")



tom = BankAccount(120)
tom.add(1800)
tom.withdraw(1200)