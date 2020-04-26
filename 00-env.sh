ENV="DEV"

if [ "$ENV" == "DEV" ]; then
    echo "Development Mode"
    ENV_PATH=Documents
else
    echo "Production Mode"
    ENV_PATH=Downloads
fi