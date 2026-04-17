import math
import statistics as stat

import json

def main():
    with open('data/employees.json','r') as file:
        data = json.load(file)
    
    employeeData = data["data"]

    salaries = []
    for employee in employeeData:
        salaries.append(employee['comprate'])
    
    print(stat.mean(salaries))
    print(stat.median(salaries))

if __name__ == '__main__':
	main()
