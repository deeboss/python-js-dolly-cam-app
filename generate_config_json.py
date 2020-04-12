import json

filename = 'config_options.txt'

results = []
configDict = {}
configOptions = []

with open(filename) as fh:

    for line in fh:
        configLine = line.strip().split(': ', -1)
        key = configLine[0]

        if key == 'Choice':
            print("running Choice")
            value = configLine[1].split(' ', 1)[1]
            configOptions.append(value)
            configDict[key] = configOptions

        elif key != 'END':
            value = configLine[1]
            configDict[key] = value

        else:
            finalConfigDict = configDict.copy()
            results.append(finalConfigDict)



output_file = open("config_options.json", "w") 
json.dump(results, output_file, indent = 4, sort_keys = False) 
output_file.close() 