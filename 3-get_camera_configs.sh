gphoto2 --list-config | awk -F'/' '{print $4}' > available_configs.txt

while IFS= read -r CONFIG; do
    gphoto2 --get-config=$CONFIG
done < available_configs.txt > config_options.txt

python3 generate_config_json.py