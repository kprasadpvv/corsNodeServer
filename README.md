### Example ExpressJS Server to Handle Cross-Origin Cookies

## Steps to setup:

1) Install `node`
2) Clone the repo `git clone git@github.com:kprasadpvv/corsNodeServer.git`
3) If the ssl cert is not working do `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
4) Add below entries in `etc/host` file
```
127.0.0.1       local.example1.com
127.0.0.1       local.example2.com
```
5) do `npm start`
6) Visit https://local.example1.com:3000/test and allow browser certificate check. do same for https://local.example2.com:3000/test
7) Now click on the buttons to test the cookies.
