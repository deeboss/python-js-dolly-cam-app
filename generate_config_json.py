import json

filename = 'config_options.txt'

results = []
dictObject = {}

line_count = 0

with open(filename) as fh:
    for line in fh:
        configLine = line.strip().split(': ', 1)
        key = configLine[0]

        if key == 'END':
            print("skip me!")
        else:
            print("gogogo")
            value = configLine[1]
            dictObject[key] = value
            print(dictObject)
            
        

# print(json.dumps(dict1, indent=2, sort_keys=True))

output_file = open("config-options.json", "w") 
json.dump(dictObject, output_file, indent = 4, sort_keys = False) 
output_file.close() 

# split("\n") | reduce (.[] | split(": ")) as $item ({};
#         $item[0] as $key |
#         $item[1] as $value |
#         .[$key] =
#             if has($key)|not then
#                 $value
#             elif .[$key]|type == "array" then
#                 .[$key]+[$value | split(" ")[1]]
#             else
#                 [.[$key], $value | split(" ")[1]]
#             end)'