gphoto2 --list-config | awk -F'/' '{print $4}' > available_configs.txt

while IFS= read -r CONFIG; do
    gphoto2 --get-config=$CONFIG | jq -n --raw-input '
    reduce (inputs | split(": ")) as [$key, $value] ({}; .[$key] =
        if has($key)|not then
            $value
        elif .[$key]|type == "array" then
            .[$key] + [$value]
        else
            [.[$key], $value]
        end)'

done < available_configs.txt > config_options.json
