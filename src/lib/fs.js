/* eslint-disable no-console */
import * as fs from 'expo-file-system'

// // craete and write and read a .lib file
// const createAndWriteLibFile = async (data, name) => {
//   const libFilePath = `${FileSystem.documentDirectory}${name}.lib`
//   const libFileContent = JSON.stringify(data)

//   try {
//     await FileSystem.writeAsStringAsync(libFilePath, libFileContent)
//     console.log('Successfully created and wrote the .lib file')
//   } catch (error) {
//     console.log('Error creating and writing the .lib file:', error)
//   }
// }

export default function useFs() {
  const createAndWritefile = async function (fileName, content) {
    const fileURL = `${fs.documentDirectory}${fileName}.lib`
    try {
      await fs.writeAsStringAsync(fileURL, JSON.stringify(content))
      console.log(`Successfully created and wrote the ${fileName}.lib file`)
    } catch (error) {
      console.error(error)
    }
  }

  const readFile = async function (fileName) {
    const fileURL = `${fs.documentDirectory}${fileName}.lib`
    try {
      const data = await fs.readAsStringAsync(fileURL)
      return JSON.parse(data)
    } catch (error) {
      console.log(error)
      return null
    }
    // Add a return statement at the end of the function
  }

  const deleteFile = async function (fileName) {
    const fileURL = `${fs.documentDirectory}${fileName}.lib`
    try {
      await fs.deleteAsync(fileURL)
    } catch (error) {
      console.error(error)
    }
  }

  const cekFileLocation = async function () {
    const fileURL = `${fs.documentDirectory}`
    try {
      console.log('file location:', fileURL)
    } catch (error) {
      console.error(error)
    }
  }
  const getAllFiles = async function () {
    const files = await fs.readDirectoryAsync(fs.documentDirectory)
    // console.log('files:', files)
    return files
  }

  const deleteAllFiles = async function () {
    const files = await fs.readDirectoryAsync(fs.documentDirectory)
    files.forEach(async (file) => {
      await fs.deleteAsync(`${fs.documentDirectory}${file}`)
    })
  }

  return {
    createAndWritefile,
    readFile,
    deleteFile,
    cekFileLocation,
    getAllFiles,
    deleteAllFiles
  }

}
