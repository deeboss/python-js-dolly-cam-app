import os
import json

print("Starting Python script to generate configurations")

baseFilename = 'config_options.txt'
secondaryFilename = 'available_configs.txt'

results = []
configsDict = {}
optionsArray = []

with open(baseFilename) as fh:
    idx = 0

    for line in fh:
        lineItem = line.strip().split(': ', -1)
        key = lineItem[0]

        if key == 'Choice':
            value = lineItem[1].split(' ', 1)[1]
            optionsArray.append(value)
    
        elif key != 'END':
            value = lineItem[1]
            configsDict['id'] = ''
            configsDict[key] = value

        # Reached the end of a configuration
        else:
            configsDictOutput = configsDict.copy()
            results.append(configsDictOutput)
            
            if len(optionsArray) != 0:
                currentConfigsOptionsArray = optionsArray.copy()
                results[idx]['Choice'] = currentConfigsOptionsArray

            idx+=1
            del optionsArray[:]


with open(secondaryFilename) as fh:
    idx = 0

    for line in fh:
        lineItem = line.strip().split(' ', -1)
        value = lineItem[0]
        results[idx]['id'] = value
        idx+=1


output_file = open("config_options.json", "w") 
json.dump(results, output_file, indent = 4, sort_keys = False) 
output_file.close() 

print("Removing unneeded text files")
os.remove(baseFilename)
os.remove(secondaryFilename)

print("Done!")