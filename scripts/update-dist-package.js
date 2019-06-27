const fs = require('fs')

const rootPack = require('../package.json')
const packPath = require.resolve('../dist/package.json')
const pack = require(packPath)

const keys = [
  'version','keywords','description','name',
  'author','repository','license','contributors',
  'jsDependencies'//old
]

keys.forEach(name=>{
  if( rootPack[name]==null )return
  pack[name]=rootPack[name]
})

fs.writeFileSync(packPath, JSON.stringify(pack, null, 2))
const path = require('path')

distCopy('CHANGELOG.md')
distCopy('README.md')
distCopy('LICENSE')

console.log('\x1b[33m[angular-file]:\x1b[0m', 'updated dist package version to ', pack.version)


function distCopy(fileName){
  const fromReadMe = path.join(packPath,'../../', fileName)
  const toReadMe = path.join(packPath,'../', fileName)
  fs.writeFileSync(toReadMe, fs.readFileSync(fromReadMe))
}
