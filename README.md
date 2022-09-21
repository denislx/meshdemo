# meshdemo

## OCI mesh stuff getting done here.

This OCI Service Mesh microservices example has two home versions that is configured as home v1 and v2 and load routed 50-50 between them. Only home v2 calls the price component for JSON data.
Services and Mesh (re)deployment is done from OCI DevOps.


Create OCIR <i>Docker login password</i> <b>secret</b> in OCI Vault.

Build pipeline required parameters: 
<ul>
<li><b>password</b> ATP password e.g. <i>WelcomeFolks456#!</i></li>
<li><b>instant_client</b> e.g. <i>instantclient-basic-linux.x64-21.7.0.0.0dbru.zip</i> from object storage PAR. Download the file from OTN https://download.oracle.com/otn_software/linux/instantclient/217000/instantclient-basic-linux.x64-21.7.0.0.0dbru.zip to it.</li>
<li><b>sqlcli_client</b> e.g. V1022102-01.zip from object storage PAR. Download the file from OTN https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/ to it.</li>
<li><b>jdk</b> e.g. <i>jdk-11.0.16_linux-x64_bin.tar.gz</i> from object storage PAR. Download the file from OTN https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html to it.</li>
<li><b>compartment_ocid</b> compartment OCID you are working on/installing mesh to</li>
<li><b>dns_compartment</b>_ocid DNS compartment (can be same of different from <i>compartment_ocid</i>)</li>
<li><b>dns_domain</b> e.g. mymesh.example.io for DNS</li>
<li><b>dns_region</b> e.g. eu-frankfurt-1 for DNS</li>
<li><b>oke_region</b> OKE cluster region e.g. eu-frankfurt-1</li>
<li><b>oke_ocid</b> OKE cluster OCID</li>
<li><b>docker_user</b> Docker user e.g. frsxwtjslf34/oracleidentitycloudservice/mika.rinne@oracle.com</li>
<li><b>docker_registry</b> Docker registry/OCIR e.g. ams.ocir.io/frsxwtjslf34</li>
<li><b>secret_ocid</b> Docker password Secret OCID in Vault</li>
<li><b>logging_dynamicgroup_ocid</b> Dynamic Group OCID to create logging for Grafana</li>
<li><b>log_object_ocid</b> Log object OCID in LogGrups for Grafana</li>
</ul>
