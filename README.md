# Meloco: Language learning app

The application is take some idea from the [Hiragana Pro](https://play.google.com/store/apps/details?id=com.myapps.hiragana) and [Katakana Pro](https://play.google.com/store/apps/details?id=com.myapps.katakana) applications. But I also add my own taste to it.

## Usage

Install npm packages:

```sh
npm install
```

Run it (development ver.):

```sh
npm run dev
```

If you want to use Docker, first build the image:

```sh
docker build -t meloco .
```

then run it:

```sh
docker run --name meloco --rm -d -p 8080:80 localhost/meloco
```

visit [http://localhost:8080/](http://localhost:8080/)

## License

The project is licensed under the MIT licence, **except** for the `public/audio/japanese/anki_author_195754716/` directory and it's audio files.  
You can read more about these licence(s) here:

- [AnkiWeb](https://ankiweb.net/shared/info/195754716)
- [AnkiWeb Terms and Conditions](https://ankiweb.net/account/terms)
