#!/bin/bash
# Ask the user for their name
echo Migration name?
read varname
echo creating migration $varname...

yarn run migrate create $varname
