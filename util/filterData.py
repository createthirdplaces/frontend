import math
import pandas as pd
import statistics as stat

cols = ['LotSizeQty','GrossFloorAreaSquareFeetQty','StoryHeightCnt','AssessmentDate','RealEstatePropertyCode','ImprovementValueAmt','LandValueAmt']

filterColName = 'AssessmentDate'
filterRowValue = '2025-12-31'

class PropertyHistory:

	squareFeet = 0
	def __init__(self,squareFeet):
		self.squareFeet = squareFeet
		self.data = dict()
		self.up = 0
		self.down = 0
	
	def addDataForYear(self,year,value):
	  self.data[year] = value

def filterCols(names,data):
  return data[names]

def filterRowValues(filterColName,filterRowValue,data):
	return data[data[filterColName] > filterRowValue]

def checkVolatility(data):
  
	export = dict()	
	
	for i,row in data.iterrows():
		year = row['AssessmentDate']
		
		code = row['RealEstatePropertyCode']
		
		if row['GrossFloorAreaSquareFeetQty'] > 0:
			if not code in export:
				export[code] = PropertyHistory(row['GrossFloorAreaSquareFeetQty']) 
			
			export[code].addDataForYear(year[:4],row['ImprovementValueAmt'])

	squareFeet = []
	volatility = []	
	up = []
	down = []	
	
	for key,value in export.items():
		squareFeet.append(export[key].squareFeet)
  
		changes = []
		
		prevYear = -1
		prevValue = -1	

		for year in value.data.keys():
			amount = value.data[year]	
			if prevYear != -1 and prevValue != 0:
				diff = int(year)-int(prevYear)
				if diff == 1:
					change = (amount - prevValue)/prevValue
					changes.append(change)
					if change > 0:
						value.up += 1
					else:
						value.down += 1
		
			prevYear = year
			prevValue = amount

		up.append(value.up)
		down.append(value.down)	
		if len(changes) < 2:
			volatility.append(0)
		else:	
			volatility.append(stat.stdev(changes))
		
	df2 = pd.DataFrame()
	df2['size'] = squareFeet
	df2['volatility'] = volatility
	df2['up'] = up
	df2['down'] = down	
	df2.to_csv('data/volatility.csv')
	
class StoryData:
	items = []

	improvementData = []
	total = 0
	height = 0
	
	def __init__(self,items,height):
		self.items = []
		self.height = height
		self.improvementData = []

def main():
	
	propertyData = pd.read_table('data/PropertyRedacted.txt',delimiter='|')
	
	data = pd.read_table('data/ArlingtonVARealEstateAssessment.txt',delimiter='|')

	data = pd.merge(propertyData, data,on='RealEstatePropertyCode')
	checkVolatility(data)  

	filter1 = filterRowValues(filterColName, filterRowValue,data)
  
	filter2 = filterCols(cols, filter1)

	filter3 = filter2[filter2['GrossFloorAreaSquareFeetQty'].notnull()]
	data = []

	maxStories = 39
	sectionSize = 5	
	for i in range(int(maxStories/sectionSize)+1):
		data.append(StoryData(i,0))

	for i,row in filter3.iterrows():
		if not math.isnan(row['StoryHeightCnt']) and row['GrossFloorAreaSquareFeetQty']>0:
			
			j = int(row['StoryHeightCnt']/sectionSize)
			data[j].items.append((row['ImprovementValueAmt']+row['LandValueAmt'])/row['GrossFloorAreaSquareFeetQty'])
			data[j].improvementData.append(row['ImprovementValueAmt']/row['GrossFloorAreaSquareFeetQty'])

	df = pd.DataFrame()
 
	labels = ['0-5','6-10','11-15','16-20','21-25','26-30','30-35','35-40']
	medianData = []	
	medianImprovementData = []	
	count = []

	for i in range(len(data)):
		if len(data[i].items) > 0:	
			medianData.append(stat.median(data[i].items))
			
			medianImprovementData.append(stat.median(data[i].improvementData))	
			count.append(len(data[i].items))	
		else:
			medianData.append(0)	
			count.append(0)
			medianImprovementData.append(0)
	
	df['nunberOfBuildings'] = count	
	df['medianValuePerSquareFoot'] = medianData
	df['medianImprovementValuePerSqFt'] = medianImprovementData	

	df.index = labels	
	df.index.name = 'number of stories'	
	df.to_csv('data/output.csv')

	print(filter3.columns)
	df2 = filter3[['ImprovementValueAmt','GrossFloorAreaSquareFeetQty']].copy()

	updates = []	
	for i in range(0,25):
		updates.append([])

	for i,row in df2.iterrows():
		idx = int(math.log2(1+row['GrossFloorAreaSquareFeetQty']))
		if row['GrossFloorAreaSquareFeetQty'] > 0:	
			updates[idx].append(row['ImprovementValueAmt']/row['GrossFloorAreaSquareFeetQty'])

	df3 = pd.DataFrame();
	medians = []
	for i in range(0,len(updates)):
		if len(updates[i]) == 0:
			medians.append(0)
		else:	
			medians.append(stat.median(updates[i]))	
  
	df3['medianValue'] = medians

	df3.to_csv('data/values.csv')

if __name__ == '__main__':
	main()
