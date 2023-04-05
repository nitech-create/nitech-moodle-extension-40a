for file in $(find . -name "*.ts"); do
    deno cache $file --import-map ./import_map.json
done