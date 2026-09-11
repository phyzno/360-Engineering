const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('c:/Projects/DF-interiors/src', function(filePath) {
  if(filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Fix broken replacements
    content = content.replace(/hello@DF Interiorsinteriors\.com/gi, 'info@df-interiors.net');
    content = content.replace(/hello@df-interiorsinteriors\.com/gi, 'info@df-interiors.net');
    content = content.replace(/hello@verdantinteriors\.com/gi, 'info@df-interiors.net');
    
    content = content.replace(/DF Interiorsinteriors\.com/gi, 'df-interiors.net');
    content = content.replace(/df-interiorsinteriors\.com/gi, 'df-interiors.net');
    
    content = content.replace(/DF Interiors Interiors/gi, 'DF Interiors');
    
    // Replace Verdant leftovers
    content = content.replace(/Verdant Interiors/gi, 'DF Interiors');
    content = content.replace(/Verdant/g, 'DF Interiors');
    content = content.replace(/verdant/g, 'df-interiors');
    
    // Replace Phone and Address globally
    content = content.replace(/\+1 \(212\) 555-0198/g, '+965 5011 8191');
    content = content.replace(/\+12125550198/g, '+96550118191');
    content = content.replace(/123 Forest Avenue, Suite 400<br \/>New York, NY 10012<br \/>United States/g, 'Kuwait');
    content = content.replace(/123 Forest Avenue, Suite 400<br \/>New York, NY 10012/g, 'Kuwait');

    // Also update Google Map embed location to Kuwait instead of NY
    content = content.replace(/https:\/\/www\.google\.com\/maps\/embed\?pb=[^\"']+/g, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.993688172978!2d47.97341851508212!3d29.375859982128795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c83ce455983%3A0xc3ebaef5af09b90e!2sKuwait%20City!5e0!3m2!1sen!2skw!4v1693301019054!5m2!1sen!2skw');

    if(content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed ' + filePath);
    }
  }
});
