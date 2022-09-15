#!/bin/bash

export conn=oracledb_tp
export pwd=atp_pwd
export schema=PRICEADMIN
export wsname=PRICEADMIN
export application_id=100
export tables_to_copy=Y


if [ "${tables_to_copy}" == "Y" ]; then
    export tablesconfig="lb data"
else
    export tablesconfig=""
fi    

printf "set cloudconfig ./Wallet/Wallet.zip\nconn ${schema}/${pwd}@${conn}\n/\ntables\nlb genschema -split\n${tablesconfig}\n" > gen.sql

if [ -n "${application_id}" ]; then
    printf "lb genobject -type apex -applicationid ${application_id} -skipExportDate -expOriginalIds\nexit" >> gen.sql
fi
