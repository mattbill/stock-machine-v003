# stock-machine-v003

### Setup
````
sudo easy_install virtualenv
virtualenv venv
source venv/bin/activate
pip install https://github.com/pallets/flask/tarball/master
pip install -r requirements.txt

npm install
bower install
gulp prod
````

### Run
Run either...
````
bat/run_dev 
bat/run_prod
````
Or do it manually with either of the following...  
**dev**
````
source venv/bin/activate  
env=dev python server.py
````
**prod**
````
source venv/bin/activate  
env=prod python server.py  
````
