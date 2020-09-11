from os import listdir
from os.path import isfile, join, splitext

imgPath = "./../img"
imgFiles = [f for f in listdir(imgPath) if isfile(join(imgPath, f))]

artFile = open("./../js/art.js","w")
artFile.write("class Art{\n")
artFile.write("\tstatic loadArt(){\n")

for fileName in imgFiles:
    fileNameNoExt = splitext(fileName)[0]
    artFile.write("\t\tArt.{0} = loadImage('img/{1}');\n".format(fileNameNoExt, fileName))

artFile.write("\t}\n")
artFile.write("}")
artFile.close()
