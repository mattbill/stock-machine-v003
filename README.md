# stock-machine-v003

### Setup
````
sudo easy_install virtualenv
virtualenv venv
source venv/bin/activate
pip install https://github.com/pallets/flask/tarball/master
pip install -r requirements.txt

npm install bower -g
npm install tsc -g

npm install
bower install

gulp dev
gulp prod
````

### Development
Run the following and then work normally
```
gulp watch
```

### Run
Run either...
````
bat/run_dev 
bat/run_prod
````
