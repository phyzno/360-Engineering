import codecs

with open('src/components/contact/ContactForm.tsx', 'rb') as f:
    content = f.read()

# Replace replacement character (U+FFFD) which is '\xef\xbf\xbd' in utf-8, or any invalid sequence
content_str = content.decode('utf-8', errors='replace')
content_str = content_str.replace('\ufffd', '-')
content_str = content_str.replace('-?', ' -')

with open('src/components/contact/ContactForm.tsx', 'w', encoding='utf-8') as f:
    f.write(content_str)
