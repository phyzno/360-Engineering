const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('c:/Projects/360-Engineering/src', function(filePath) {
  if(filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Names
    content = content.replace(/Arch Concept/g, '360 Engineering and Consultancy');
    content = content.replace(/ArchConcept/g, '360Engineering');
    
    // Slogan
    content = content.replace(/We transform Your Vision Into Beautifully Crafted Spaces\./g, 'Your Satisfaction Our Destination.');
    
    // Social
    content = content.replace(/archconceptbd/g, 'group360bd');
    
    // Contact Info
    content = content.replace(/info@group360bd\.com/g, 'group360bd@gmail.com');
    content = content.replace(/hello@group360bd\.com/g, 'group360bd@gmail.com');
    
    content = content.replace(/\+880 1712 345678/g, '+8801410360247');
    content = content.replace(/\+8801712345678/g, '+8801410360247');
    
    content = content.replace(/\+880 1912 345678/g, '+8801335224360');
    content = content.replace(/\+8801912345678/g, '+8801335224360');
    
    // Also, another number was previously found: +8801974712423, +8801869389599. Let's replace them too just in case.
    content = content.replace(/\+880 1974 712423/g, '+8801410360247');
    content = content.replace(/\+8801974712423/g, '+8801410360247');
    content = content.replace(/\+880 1869 389599/g, '+8801335224360');
    content = content.replace(/\+8801869389599/g, '+8801335224360');
    
    // One more check for email
    content = content.replace(/group360bd\.com/g, 'group360bd@gmail.com');
    content = content.replace(/group360bd@gmail\.com@gmail\.com/g, 'group360bd@gmail.com'); // Fix double if it happens

    if(content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed ' + filePath);
    }
  }
});
