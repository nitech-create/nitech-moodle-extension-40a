options=""
for arg in "$@"; do
    if [[ "$arg" == "--reload" ]]; then
        options="$options --reload"
    fi
done

deno cache $options --importmap ./import_map.json $(find ./src/ -name "*.ts")
