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
<li>compartment_ocid</li> compartment OCID you are working on/installing mesh to
<li>dns_compartment_ocid</li> DNS compartment (can be same of different from <li>compartment_ocid</li>)
<li>dns_domain</li> e.g. mymesh.example.io for DNS
<li>dns_region</li> e.g. eu-frankfurt-1 for DNS
<li>oke_region</li> OKE cluster region e.g. eu-frankfurt-1
<li>oke_ocid</li> OKE cluster OCID
<li>docker_user</li> Docker user e.g. frsxwtjslf34/oracleidentitycloudservice/mika.rinne@oracle.com
<li>docker_registry</li> Docker registry/OCIR e.g. ams.ocir.io/frsxwtjslf34
<li>secret_ocid</li> Docker password Secret OCID in Vault
<li>logging_dynamicgroup_ocid</li> Dynamic Group OCID to create logging for Grafana
<li>log_object_ocid</li> Log object OCID in LogGrups for Grafana
</ul>
