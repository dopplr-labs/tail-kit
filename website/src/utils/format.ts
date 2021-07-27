import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'

/**
 * Format JS/TS code using prettier
 *
 * @param inputCode - Input code to be formatted
 * @returns - formatted code
 */
export default function format(inputCode: string): string {
  // format the code using prettier
  let outputCode = prettier.format(inputCode, {
    semi: false,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 64,
    parser: 'babel',
    plugins: [parserBabel],
  })

  // while formatting the code, sometimes prettier injects semicolon at the begining of the code
  // this might happen when the code is an expression (such as JSX expression)
  // in that case, we need to remove the semicolon
  if (outputCode.startsWith(';')) {
    outputCode = outputCode.substr(1)
  }

  return outputCode.trim()
}
