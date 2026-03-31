import math
import pandas as pd

cols = ['LotSizeQty','GrossFloorAreaSquareFeetQty','StoryHeightCnt','AssessmentDate','RealEstatePropertyCode','ImprovementValueAmt','LandValueAmt']

filterColName = 'AssessmentDate'
filterRowValue = '2025-12-31'

def filterCols(names,data):
  return data[names]

def filterRowValues(filterColName,filterRowValue,data):
	return data[data[filterColName] > filterRowValue]


class StoryData:
	items = 0
	total = 0
	height = 0
	def __init__(self,items,total,height):
		self.items = items
		self.total = total
		self.height = height

def main():
	
	propertyData = pd.read_table('data/PropertyRedacted.txt',delimiter='|')
	
	data = pd.read_table('data/ArlingtonVARealEstateAssessment.txt',delimiter='|')

	data = pd.merge(propertyData, data,on='RealEstatePropertyCode')

	filter1 = filterRowValues(filterColName, filterRowValue,data)
	print(filter1.head(11))
  
	filter2 = filterCols(cols, filter1)
	print(filter2.head(11))	

	filter3 = filter2[filter2['GrossFloorAreaSquareFeetQty'].notnull()]

	print(filter3.head(11))
	
	data = []

	for i in range(35):
		data.append(StoryData(i,0,0))

	for i,row in filter3.iterrows():
		if not math.isnan(row['StoryHeightCnt']) and row['GrossFloorAreaSquareFeetQty']>0:
			data[int(row['StoryHeightCnt'])].items +=1
			data[int(row['StoryHeightCnt'])].total += (row['ImprovementValueAmt'])/row['GrossFloorAreaSquareFeetQty']

	for i in range(35):
		if data[i].items > 0:	
			print(data[i].total/data[i].items)	
		else:
			print('0')	



	filter3.to_csv('data/output.csv')




if __name__ == '__main__':
	main()
