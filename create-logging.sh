oci logging log-group create --compartment-id ocid1.compartment.oc1..aaaaaaaabwqnkg5r4sgb72edair3gaxqckws6p2qgxlyq67mnnqxvntwm4vq --display-name mesh

oci logging log create --log-group-id ocid1.loggroup.oc1.eu-amsterdam-1.amaaaaaauevftmqai37a4bhsbww2lznfmpokhczhnl4lrcl3qofsulsu3sya --display-name meshdemo-logs --log-type custom

oci logging agent-configuration create --compartment-id ocid1.compartment.oc1..aaaaaaaabwqnkg5r4sgb72edair3gaxqckws6p2qgxlyq67mnnqxvntwm4vq --is-enabled true --service-configuration file://logconfig.json --display-name BookinfoLoggingAgent --description "Custom agent config for mesh" --group-association '{"groupList": ["ocid1.dynamicgroup.oc1..aaaaaaaajuhwx6zv2mygnv2t4wjbzfmebrifuspwc5ure362hmc4ushynn6q"]}'

