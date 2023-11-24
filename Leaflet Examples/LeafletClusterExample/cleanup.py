import json

# Open input.json
with open('input.json') as f:
    data = json.load(f)

# Remove everything except "longitude" and "latitude"
for i in range(len(data)):
    for key in list(data[i]):
        if key != 'longitude' and key != 'latitude':
            del data[i][key]


# Rename "longitude" and "latitude" to "lng" and "lat"
for i in range(len(data)):
    data[i]['lng'] = data[i].pop('longitude')
    data[i]['lat'] = data[i].pop('latitude')

# Write to output.json
with open('output.json', 'w') as f:
    json.dump(data, f, indent=4)