/*

A facade is a class that provides a simple interface to a complex subsystem 
which contains lots of moving parts. It is a high level class that abstracts subsystems details
A facade might provide limited functionality in comparison to working with the subsystem directly. 
However, it includes only those features that clients really care about.
Very handy for integrate internal systems with 3rd libraries systems.

*/

// 3rd library/framework subsystem
class _3dFileReader{
  readFromTxt(filename: string) {
    console.log("reading txt - " + filename);
  }

  readFromCsv(filename: string) {
    console.log("reading csv - " + filename);
  }

  readFromYaml(filename: string) {
    console.log("reading yaml - " + filename);
  }
} 

// Facade implementation
class FileIntegrator {
  read(filename: string) {
    // subsystem integration
    const reader = new _3dFileReader();
    reader.readFromYaml(filename);
  }
}


export function execute() {
  const filename = "sounds.yaml";
  const integrator = new FileIntegrator();
  integrator.read(filename);
}

/*

1 - Use the Facade pattern when you need to have a limited but straightforward interface to a complex subsystem.
2 - Use the Facade when you want to structure a subsystem into layers.

*/