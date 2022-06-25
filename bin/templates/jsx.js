const returnJsx = ({ styleFile, fileName, styleModule }) => {
  if(!styleFile) {
    return `<div>${fileName}</div>`
  }
  return `<div className=${styleModule ? "{styles.wrapper}" : '"wrapper"'}>${fileName}</div>`
}


const  jsxTemplate = ({ fileName, styleExt, styleModule, typescript, styleFile }) =>
`import React${typescript ? ", {FC}" : ""} from 'react';
${styleFile ? `import ${styleModule ? "styles from": ""} './${fileName}${styleModule ? ".module": ""}${styleExt}';` : ''}
${typescript ? `
interface Props {
  
}
` : ''}
const ${fileName}${typescript ? ":FC<Props>" : ""} = ({}) => {
	return ${returnJsx({ styleFile, fileName, styleModule })};
};

export default ${fileName};
`
module.exports = {jsxTemplate}
