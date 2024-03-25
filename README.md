# Example ExpressJS Server to Handle Cross-Origin Cookies

## Steps to setup

1) Install `node`
2) Clone the repo `git clone git@github.com:kprasadpvv/corsNodeServer.git`
3) Checkout to the repo `cd corsNodeServer`
4) Install secure certs locally `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
5) Do `npm install`
6) Add below entries in `etc/host` file `sudo vi etc/host`

    ```bash
    127.0.0.1       local.example1.com
    127.0.0.1       local.example2.com
    ```

7) Do `npm start`
8) Visit <https://local.example1.com:3000/test> and allow browser certificate check. do same for <https://local.example2.com:3000/test>
9) Now click the buttons present in https://local.example1.com:3000/test to test the cookies transfer on xhr calls.
