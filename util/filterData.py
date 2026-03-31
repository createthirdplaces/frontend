import pandas as pd

cols = ['TaxYearDate','AssessedTaxAmt','TotalAmt']

filterColName = 'TaxYearDate'
filterRowValue = 2025

def filterCols(names,data):
  return data[names]

def filterRowValues(filterColName,filterRowValue,data):
  return data[data[filterColName] == filterRowValue]



def main():
	data = pd.read_table('data/Arlington_VA_Property_Tax_Data.txt',delimiter='|')
	
	filter1 = filterRowValues(filterColName, filterRowValue,data)
	print(filter1.head(11))
  
	filter2 = filterCols(cols, filter1)
	print(filter2.head(11))	

	filter2.to_csv('data/output.csv')




if __name__ == '__main__':
	main()
