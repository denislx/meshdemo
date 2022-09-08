# meshdemo

## OCI mesh stuff getting done here.

This OCI Service Mesh microservices example has two home versions that is configured as home v1 and v2 and load routed 50-50 between them. Only home v2 calls the price component for JSON data.
Services and Mesh (re)deployment is done from OCI DevOps.

Build pipeline required parameters: 
<ul>
<li><b>password</b> e.g. <i>WelcomeFolks123#!</i></li>
<li><b>instant_client</b> e.g. <i>instantclient-basic-linux.x64-21.7.0.0.0dbru.zip</i> from object storage PAR. Download the file from OTN https://download.oracle.com/otn_software/linux/instantclient/217000/instantclient-basic-linux.x64-21.7.0.0.0dbru.zip to it.</li>
<li><b>sqlcli_client</b> e.g. V1022102-01.zip from object storage PAR. Download the file from OTN https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/ to it.</li>
<li><b>jdk</b> e.g. <i>jdk-11.0.16_linux-x64_bin.tar.gz</i> from object storage PAR. Download the file from OTN https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html to it.</li>
</ul>

In build_spec.yaml adjust compartment and other OCIDs including the  OKE endpoint and the OCIR login with OCI Vault 
(create a <b>secret</b> for <i>Docker login password</i>)
