#!/bin/bash

export conn=oracledb_tp
export pwd=
export schema=PRICEADMIN
export wsname=PRICEADMIN
export application_id=100
export tables_to_copy=Y
export secret_id=

if [ "${secret_id}" != ""]; then
    rm -rf ./Wallet
    mkdir ./Wallet
    cd ./Wallet
    export atp_pwd=$(oci secrets secret-bundle get --secret-id ${secret_id} --query "data.\"secret-bundle-content\".content" | tr -d '"' | base64 -d)
    oci db autonomous-database generate-wallet --autonomous-database-id ${atp_id} --password=${atp_pwd} --file=Wallet.zip
    unzip Wallet.zip
    sed -i "s|"?/network/admin"|"./Wallet"|g" sqlnet.ora
    rm -f Wallet.zip
    zip Wallet.zip *
    cd ..
fi

if [ "${tables_to_copy}" == "Y" ]; then
    export tablesconfig="lb data"
else
    export tablesconfig=""
fi    

printf "set cloudconfig ./Wallet/Wallet.zip\nconn ${schema}/${pwd}@${conn}\n/\ntables\nlb genschema -split\n${tablesconfig}\n" > gen.sql

if [ -n "${application_id}" ]; then
    printf "lb genobject -type apex -applicationid ${application_id} -skipExportDate -expOriginalIds\nexit" >> gen.sql
fi

./sqlcl/bin/sql /nolog @./upd_apex.sql
