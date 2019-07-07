# truss-simulator

Solves trusses and helps the user visualize points of failure. Originally created for Trig Honors Semester 2 Project.

The project can be viewed at: https://sanketh7.github.io/truss-simulator/



## Features

- draws trusses based on Cartesian points entered
- allows user to set tensile and compressive strength
- allows user to specify the load and reaction forces
- allows user to export and import data for ease of use



### Sample data:

1. Click **"Import Data"** at the bottom

2. Copy and paste the following data:

   ```json
   {"joints":[{"name":"A","x":"0","y":"0"},{"name":"B","x":"4","y":"0"},{"name":"C","x":"8","y":"0"},{"name":"D","x":"12","y":"0"},{"name":"E","x":"4","y":"4"},{"name":"F","x":"8","y":"4"}],"members":[{"j1":"A","j2":"E"},{"j1":"A","j2":"B"},{"j1":"B","j2":"E"},{"j1":"E","j2":"F"},{"j1":"B","j2":"F"},{"j1":"B","j2":"C"},{"j1":"C","j2":"F"},{"j1":"C","j2":"D"},{"j1":"D","j2":"F"}],"loads":[{"joint":"E","x":"0","y":"-40000"},{"joint":"C","x":"0","y":"-100000"}],"reactions":[{"joint":"A","x":"+x","y":"0"},{"joint":"A","x":"0","y":"+y"},{"joint":"D","x":"0","y":"+y"}],"tensileStrength":"100000","compressiveStrength":"100000"}
   ```

3. Once the data has been entered, click **"Update"** at the bottom to update the program.
