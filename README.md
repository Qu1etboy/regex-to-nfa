# Regular Expression to NFA Converter

Project for 01418334(66-2) Compiler Techniques

## Backend

Using Python and Flask to handle logic for converting regular expression to NFA using [McNaughton-Yamada-Thompson algorithm](<http://cgosorio.es/Seshat/thompson?expr=a.(a%7Cb.a)*%7Cc*.a>), deployed on Glitch.

- Source code: https://glitch.com/edit/#!/pacific-keen-variraptor
- Live site: https://pacific-keen-variraptor.glitch.me/

**Usage**

Try to send a GET request to the API with `regex` query parameter.

```sh
curl 'https://pacific-keen-variraptor.glitch.me/nfa?regex=a|b'
```

## Frontend

Display NFA from API response as a graph using [viz.js](https://viz-js.com/),
deployed on Vercel.

- Live site: https://regex-to-nfa.qu1etboy.dev/

## Members

- 6410406649 Thanrada SONNAKHONGCHAROEN
- 6410406711 Napatsorn LAOPITAKKUL
- 6410406860 Weerawong VONGGATUNYU
