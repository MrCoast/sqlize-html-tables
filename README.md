# SQLize HTML tables - browser extension

A browser extension to scan HTML tables on the page and run SQL queries against these.

## How it works:
 - it runs **sqlite** in background
 - then imports HTML tables into **sqlite**
 - provides UI to run SQL queries agaist available tables
 - shows results of `SELECT` queries

## Development

Run dev environment:

```
docker-compose up
```

Run **lint** in a docker container:

```
./lint.sh
```

Run **tests** in a docker container:

```
./test.sh
```

## Build extension

```
docker-compose -f docker-compose.build.yml up
```

To test the extension in **Chrome**:
 - enable **Developer mode**
 - go to **Extensions**
 - use **Load unpacked**
 - select **extension-dist** directory

[Read more about "Load unpacked"](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/])
