options=""
for arg in "$@"; do
    if [[ "$arg" == "--reload" ]]; then
        options="$options --reload"
    fi
done

for file in $(find . -name "*.ts"); do
    deno cache $options $file --import-map ./import_map.json
done
