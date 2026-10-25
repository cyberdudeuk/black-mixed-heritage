# Packages the Teams app: manifest.json and the two icons at the root of a zip, as Teams requires.
import zipfile,json,struct,sys,os
d=os.path.dirname(os.path.abspath(__file__))
m=json.load(open(os.path.join(d,'manifest.json')))
def size(p):
    b=open(p,'rb').read(24);return struct.unpack('>II',b[16:24])
assert size(os.path.join(d,'color.png'))==(192,192),'color icon must be 192x192'
assert size(os.path.join(d,'outline.png'))==(32,32),'outline icon must be 32x32'
out=os.path.join(d,f"bhm-hub-teams-app-{m['version']}.zip")
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for f in ['manifest.json','color.png','outline.png']: z.write(os.path.join(d,f),f)
print('packaged',out,[i.filename for i in zipfile.ZipFile(out).infolist()])
