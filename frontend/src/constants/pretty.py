import json

schools = json.load(open("schools.json"))

new_schools = {}
for s in schools:
    key = s['country_code']
    value = s['name']
    if not key in new_schools:
        new_schools[key] = []
    new_schools[key].append(value)

print(len(new_schools))

with open("new_schools.json", 'w') as f:
    f.write(json.dumps(new_schools))
