# Consortium-Blockchain



Readme : Optimized Consortium Blockchain for Medical Information Sharing

Sahil Pathak : sahil.23csz0005@iitrpr.ac.in
Raghav Patidar : 2020csb1115@iitrpr.ac.in
Rohan Khanna : 2020csb1117@iitrpr.ac.in
Vijay Dwivedi : 2020csb1140@iitrpr.ac.in
Nikhil Rastogi : 2021mcb1240@iitrpr.ac.in


We have to run the server on which consortium blockchain is developed.

To start the blockchain server we need to run “npm run dev”.
Note : To run multiple nodes we have to run the above command multiple times in multiple terminals.

Now , follow the below steps : 

Unzip the folder named “Consortium_Blockchain”.
 Installation : The project requires NodeJS and npm to work. Instructions to install all other dependencies are given below.
Node modules : Open the terminal and run ‘ npm install ’ to install project dependencies.
Ganache : Go to Ganache homepage and download.
IPFS : Go to the github page of IPFS and install IPFS Desktop
Local server :Install Node lite-server by running the following command on your terminal
“ npm install -g lite-server “
Metamask : Go to this link and add Metamask to your browser.

Steps to run the application : 

1. Ganache
Open Ganache and click on settings in the top right corner.
Under Server tab:
Set Hostname to 127.0.0.1 
Set Port Number to 8545

2. IPFS
Run following commands  
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[“*”]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[“true”]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[“PUT”, “POST”, “GET”]"


3. Smart Contract 
Install Truffle using “ npm install truffle -g “
Compile Contracts using “ truffle compile “
Open new Terminal and deploy contracts using truffle migrate
Copy deployed contract address to src/app.js

4. Connect metamask to localhost:8485

5. Start the IPFS Desktop Application

6. Start a local server
Run “ npm start “
Open localhost:3000 on your browser










