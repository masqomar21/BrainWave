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
  const [content, setContent] = useState([])
  const [fileName, setFileName] = useState('')

  const createAndWritefile = async function () {
    const fileURL = `${fs.documentDirectory}${fileName}.lib`
    // const content = JSON.stringify(data)

    try {
      await fs.writeAsStringAsync(fileURL, content)
      // console.log('succes')
    } catch (error) {
      // console.log(error)
    }
  }

  const readFile = async function () {
    const fileURL = `${fs.documentDirectory}${fileName}.lib`
    try {
      return await fs.readAsStringAsync(fileURL)
    } catch (error) {
      // console.log(error)
    }
    return null // Add a return statement at the end of the function
  }

  return {
    content,
    setContent,
    setFileName,
    createAndWritefile,
    readFile
  }

}
