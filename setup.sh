#!/bin/sh

# Check if all three parameters are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <application> <environment> <scaleunit>"
    exit 1
fi

application="$1"
environment="$2"
scaleunit="$3"

# Extract the scaleunitSuffix from the scaleunit parameter
scaleunitSuffix="${scaleunit#*)}"

# Construct the URL using the provided parameters
url="http://shared.kubedev.kibo-dev.com/kibo.config/$application/$environment/$scaleunit"
json_data=$(curl -s "$url")

echo "url=$url"

# Construct the itemName using the provided parameters
itemName="git@github.kibocommerce.com:EcommNG/Kibo.Config.git/$scaleunitSuffix/application-mz-$environment.yml"
echo "itemName=$itemName"

if [ -z "$json_data" ]; then
    echo "Failed to fetch data from the URL"
    exit 1
fi

# Replace unescaped backslashes with properly escaped backslashes
json_data_escaped=$(echo "$json_data" | sed 's/\\/\\\\/g')

# Use Python to extract the "mozu.domains.reverseproxy"
reverseproxy=$(python - <<END
import json

data = json.loads('$json_data_escaped')
filtered_object = None
for item in data['propertySources']:
    if item['name'] == '$itemName':
        filtered_object = item
        break

if filtered_object:
    reverseproxy = filtered_object['source']['mozu.domains.reverseproxy']
    print(reverseproxy)
END
)

if [ -n "$reverseproxy" ]; then
    # Append KIBO_PROXY to .env file
    echo "KIBO_PROXY=$reverseproxy" >> .env
    echo "KIBO_PROXY=$reverseproxy has been appended to .env"
else
    echo "Object not found"
fi
