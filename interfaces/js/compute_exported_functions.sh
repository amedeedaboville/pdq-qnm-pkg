#!/bin/bash
#searches for `cwrap('` plus the next word, then gets everything in the word after the ' , then prepends an underscore and quotes it
quoted_functions=($(grep -o "cwrap('\(\w\+\)" post.js | cut -d"'" -f2 | awk '{ print "\"_" $1 "\"" }'))
IFS=, #We change the IFS to turn the array from `"_funca" "_funcb" ` to `"_funca","_funcb"`
echo "[${quoted_functions[*]}]"