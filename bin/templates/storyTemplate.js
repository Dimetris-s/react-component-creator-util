const storiesTemplate = ({ fileName, typescript, slice }) => {
    return (

`${typescript ? `import type { Meta, StoryObj } from '@storybook/react';\n` : ''}import { ${fileName} } from './${fileName}';

const meta${typescript ? `: Meta<typeof ${fileName}>` : ''} = {
  title: '${slice || 'Example'}/${fileName}',
  component: ${fileName},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
${typescript ? `type Story = StoryObj<typeof ${fileName}>;\n` : ''}
export const ${fileName}Default${typescript ? ': Story' : ''} = {

};
`
)
}

module.exports = { storiesTemplate }
