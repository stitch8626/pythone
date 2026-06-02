# Напишиите программу, которая вычисляет сумму скидки в зависимости от суммы продажи.
# Пусть скидки установлены следующим образом:

# Сумма продажи	|Скидка
# 0-5000	    |5%
# 5000-15000	|12%
# 15000-25000	|20%
# свыше 25000	|30%

# После вычисления скидки программа должна вывести саму скидку и сумму с вчетом скидки. Например:


summary = int(input("Введите сумму: "))

if summary > 25000:
    discount = 30
    discount_amount = (summary * discount) / 100
    final_summary = summary - discount_amount
    print(f"Скидка: {discount_amount}")
    print(f"Сумма с учетом скидки : {final_summary}")

if summary < 25000:
    discount = 20
    discount_amount = (summary * discount) / 100
    final_summary = summary - discount_amount
    print(f"Скидка: {discount_amount}")
    print(f"Сумма с учетом скидки : {final_summary}")



# if summary  > 25000:
#     discount = 0.30
#     final_summary = summary * (1 - discount)
#     print(f"{final_summary} со скидкой в 30% ")

# if summary  > 25000:
#     discount = 0.20
#     final_summary = summary * (1 - discount)
#     print(f"{final_summary} со скидкой в 20% ")

# if summary  > 15000:
#     discount = 0.12
#     final_summary = summary * (1 - discount)
#     print(f"{final_summary} со скидкой в 12% ")

# if  summary > 5000:
#     discount = 0.05
#     final_summary = summary * (1 - discount)
#     print(f"{final_summary} со скидкой в 5% ")

